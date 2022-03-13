const express = require("express")
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

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

app.use('/api/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.use('/api/register', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        if (checkExistingUsers(req.body.username)) {
            res.send("User already exist")
        }
        else {
            users.push({
                username: req.body.username,
                password: hashedPass
            })
            res.send("User created")
        }
    } catch (err) {
        console.log(err)
    }
});

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
