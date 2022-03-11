const express = require("express")
const app = express()
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.post('/profile',(req,res)=>{
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
});

app.post('/quote',(req,res)=>{
    const gallon = req.body.gallon;
    const deliverDate = req.body.date;
    console.log(gallon)
    console.log(deliverDate)
});

app.listen(3001,()=>{
    console.log("Running on server 3001");
});