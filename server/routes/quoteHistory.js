const express = require("express");
const router = express.Router();

router.get("/history", (req, res) => {
  
  var userID = "Nhi Hoang";
  var gallons_requested = "500";
  var delivery_address = "4800 Calhoun Rd, Houston, TX 77004";
  var delivery_date = "03/01/2022";
  var suggested_price = "$3.00";
  var total_due = "$1500.00"

  let response = {};
    return res.send(response);
});

module.exports = router;
