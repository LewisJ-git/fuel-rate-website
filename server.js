const express = require("express")
const app = express()
const cors = require('cors');
var multer = require('multer');
var upload = multer(); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session');

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

const users = [];

function checkExistingUsers(inputUsername) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == inputUsername) {
            return true;
        }
    }
    return false;
}

function checkSignIn(req){
    if (req.session.user) {
        return true;
    } else {
        return false;
    }
}

app.post('/api/login', (req, res) => {
    console.log(req.body)
    if (req.body.username == null || req.body.password == null) {
        res.send("Please enter both username and password");
    } else {
        users.filter(function(user){
            if(user.username === req.body.username && user.password === req.body.password){
                req.session.user = user;
                res.send('/');
            }
            else {
                res.send("Invalid credentials!");
            }
        });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        if (checkExistingUsers(req.body.username)) {
            res.send("User already exist")
        }
        else {
            users.push({
                username: req.body.username,
                password: req.body.password
            })
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
    console.log(fullname)
    console.log(address1)
    console.log(address2)
    console.log(city)
    console.log(state)
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
