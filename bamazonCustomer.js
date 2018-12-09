require('dotenv').config();
var mysql = require("mysql");
//var inquirer = require("inquirer");

// creating the connection info for the sql database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

// connect to mysql server and sql database
//connection.connect(function(err) {
  //  if (err) throw err;
    //run start function after connection is made to prompt the user
   // start();
//});
