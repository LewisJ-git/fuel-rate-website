const express = require("express")
const app = express()
const cors = require('cors');
var multer = require('multer');
var upload = multer(); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require("./server/database.js");
const db_users = 'GasPriceGroupTen.users';

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })
);
//var quoteHistoryRouter = require("./server/routes/quoteHistory");
let user_test_id="";

function checkSignIn(req){
    if (req.session.user) {
        return true;
    } else {
        return false;
    }
}

app.post('/api/login', (req, res) => {
    try {
        if (req.body.username == null || req.body.password == null) {
            res.send("Please enter both username and password");
        } else {
            const sqlSelect = `SELECT * FROM ${db_users} WHERE username='${req.body.username}' AND password='${req.body.password}'`
            db.query(sqlSelect, (err, result) => {
                if (err) throw err
                //console.log(result)
                if (result.length != 0) {
                    req.session.user = {id: result[0].user_id};
                    //console.log(req.session.user)
                    authBool = true;
                    //res.send(req.session.user);
                    res.send("Success")
                }
                else {
                    res.send("Invalid credentials!")
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
});

app.post('/api/logout', (req, res) => {
    try {
        req.session.destroy()
        res.send("Success!")
    } catch (err) {
        console.log(err)
    }
});

app.post('/api/register', async (req, res) => {
    try {
        let exists = false;
        const sqlSelect = `SELECT * FROM ${db_users} WHERE username='${req.body.username}'`
        db.query(sqlSelect, (err, result) => {
            if (err) throw err
            //console.log(result)
            if (result.length == 0) {
                exists = false;
            }
            else {
                exists = true;
            }
        })
        if (exists) {
            res.send("User already exist")
        }
        else {
            const newUser = await db.query(`INSERT INTO ${db_users} (username, password) VALUES ('${req.body.username}', '${req.body.password}')`)
            res.send("User created")
        }
    } catch (err) {
        console.log(err)
    }
});

app.post('/auth', async (req, res) => {
    try {
        //console.log(req.session)
        if (!checkSignIn(req)) {
            //res.send('unauthorized');
            res.send({user_id: -1, message: 'unauthorized'});
        }
        else {
            //res.send('authorized');
            res.send({user_id: req.session.user.id, message: 'authorized'});
            user_test_id = req.session.user.id;
            //console.log(user_test_id);
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.get("/api/quoteHistory", (req, res) => {
  
    let user_id = parseInt(req.session.user.id);
    //let user_id = 11;
    let sql = "SELECT quotes.quote_id, gallon, profiles.address1, address2, city, state, zipcode, quotes.delivery, suggestedPrice, totalPrice FROM users, profiles, quotes WHERE quotes.user_id=? AND users.user_id = profiles.user_id AND profiles.user_id = quotes.user_id;";
  
    let response = {};
    db.query(sql, [user_id], (error, result) => {
      if (error) throw error;
      response = JSON.parse(JSON.stringify(result));
      return res.send(response);
    });
});

app.post('/api/profile',(req,res)=>{
    //let user_id = parseInt(req.session.user.id);
    
    const fullname = req.body.fullname;
    const address1 =  req.body.address1;
    const address2 = req.body.address2;
    const city =  req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    //console.log(user_id);
    console.log(zipcode);
    //res.sendStatus(200)
    
    //const user_id = 11;
    

    const sqlInsert = "INSERT INTO GasPriceGroupTen.profiles (fullname, address1, address2, city, state, zipcode, user_id) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert,[fullname,address1,address2,city,state,zipcode,user_test_id],(err,result)=>{
        console.log(result);
    });
});

app.get('/api/getClient', (req,res)=>{
    const slqSelect = "SELECT * FROM GasPriceGroupTen.profiles WHERE user_id= ?";
    //let user_id = parseInt(req.session.user.id);
    //let user_id= 11;
    db.query(slqSelect,user_test_id,(err,result)=>{
        res.send(result);
    });
});

app.post('/api/quote',(req,res)=>{
    //let user_id = parseInt(req.session.user.id);
    const gallon = req.body.gallon;
    const deliverDate = req.body.date;
    const suggestPrice = req.body.suggestedPrice;
    const totalPrice = req.body.totalPrice;
    console.log(gallon)
    console.log(deliverDate)
    console.log(suggestPrice)
    console.log(totalPrice);
    //let user_id = 11;
    const sqlInsert = `INSERT INTO GasPriceGroupTen.quotes (gallon, delivery, suggestedPrice, totalPrice, user_id) VALUES ('${req.body.gallon}', '${req.body.date}','${req.body.suggestedPrice}','${req.body.totalPrice}','${user_test_id}')`;
    db.query(sqlInsert,(err,result)=>{
        console.log(result);
    });
});



//app.use("/quotehistory", quoteHistoryRouter);

app.listen(5000,()=>{
    console.log("Running on server 5000");
});

