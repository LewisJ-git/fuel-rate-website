const mysql = require("mysql");

const db = mysql.createConnection({
  host: "database-gasprice.c1rbqsx1r2gx.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "gasprice123",
  database: "GasPriceGroupTen",
  acquireTimeout: 1000000,
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to database");
  }
});

module.exports = db;