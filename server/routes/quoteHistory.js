const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/quote", (req, res) => {
  
    let user_id = parseInt(req.query.user_id);
    let sql = "SELECT quotes.quote_id, gallon, profiles.address1, address2, city, state, zipcode, quotes.delivery, suggestedPrice, totalPrice FROM users, profiles, quotes WHERE quotes.user_id=? AND users.user_id = profiles.user_id AND profiles.user_id = quotes.user_id;";
  
    let response = {};
    db.query(sql, [user_id], (error, result) => {
      if (error) throw error;
      response = JSON.parse(JSON.stringify(result));
      return res.send(response);
    });
  });
  
  module.exports = router;