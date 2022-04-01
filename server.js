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
var quoteHistoryRouter = require("./server/routes/quoteHistory");

const current_user_id = null;

async function checkExistingUsers(inputUsername) {
    let exists = true;
    const sqlSelect = `SELECT * FROM ${db_users} WHERE username='${inputUsername}'`
    db.query(sqlSelect, (err, result) => {
        if (err) throw err
        //console.log(result)
        if (result.length == 0) {
            exists = false;
        }
    })
    return exists;
}

async function loginAuthenticator(inputUsername, inputPassword) {
    let authBool = false;
    const sqlSelect = `SELECT * FROM ${db_users} WHERE username='${inputUsername}' AND password='${inputPassword}'`
    db.query(sqlSelect, (err, result) => {
        if (err) throw err
        //console.log(result)
        if (result.length != 0) {
            current_user_id = result[0].user_id;
            authBool = true;
        }
    })
    return authBool;
}

function checkSignIn(){
    if (current_user_id == null) {
        return false;
    } else {
        return true;
    }
}

app.post('/api/login', (req, res) => {
    try {
        if (req.body.username == null || req.body.password == null) {
            res.send("Please enter both username and password");
        } else {
            const x = loginAuthenticator(req.body.username, req.body.password)
            if (x) {
                res.send("Success")
            }
            else {
                res.send("Invalid credentials!")
            }
        }
    } catch (err) {
        console.log(err)
    }
});

app.post('/api/logout', (req, res) => {
    try {
        if (!checkSignIn) {
            res.send("You are not logged in")
        }
        else {
            current_user_id = null
            res.send("Success")
        }
    } catch (err) {
        console.log(err)
    }
});

app.post('/api/register', async (req, res) => {
    try {
        if (checkExistingUsers(req.body.username)) {
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
        if (!checkSignIn(req)) {
            res.send('/login');
        }
        else {
            res.send('authorized');
        }
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/api/profile',(req,res)=>{
    const fullname = req.body.fullname;
    const address1 =  req.body.address1;
    const address2 = req.body.address2;
    const city =  req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    res.sendStatus(200)
});

app.post('/api/quote',(req,res)=>{
    const gallon = req.body.gallon;
    const deliverDate = req.body.date;
    console.log(gallon)
    console.log(deliverDate)
    res.sendStatus(200)
});

app.use("/quotehistory", quoteHistoryRouter);

app.listen(5000,()=>{
    console.log("Running on server 5000");
});
