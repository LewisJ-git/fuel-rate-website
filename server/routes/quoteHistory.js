const express = require("express");
const router = express.Router();

//router.post("/", (req, res) => {
    //let body = req.body;
    //let quoted = {
        //customer_id: body.customer_id,
        //gallons_requested: body.gallons_requeste,
        //delivery_address: body.delivery_address,
        //delivery_date: body.delivery_date,
        //suggested_price: body.suggested_price,
        //total_due: body.total_due,
    //};
  
    //console.log(req.body);

    //let response = {};
        //return res.send(response);
  //});

router.get("/api/quote", (req, res) => {
    const abc = [
        {
            id: 1,
            gallons_requested: "500",
            delivery_address: "4800 Calhoun Rd, Houston, TX 77004",
            delivery_date: "03/01/2022",
            suggested_price: "$3.00",
            total_due: "$1500.00",
        },
        {
            id: 2,
            gallons_requested: "1000",
            delivery_address: "4800 Calhoun Rd, Houston, TX 77004",
            delivery_date: "03/05/2022",
            suggested_price: "$3.00",
            total_due: "$3000.00",
        }
    ];
    res.json(abc);
});

module.exports = router;