require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

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
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res, null, 2));
        //connection.end();
        runSearch();
    });
}

function runSearch() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "WHAT IS THE ID OF THE PRODUCT YOU WOULD LIKE TO BUY?",
                name: "productId"
            },
            
            {
                type: "input",
                message: "HOW MANY UNITS OF THIS PRODUCT WOULD YOU LIKE TO BUY?",
                name: "username"
            }
        ])
        .then(function (answer) {
            determineAnswer(answer);
        });
}



// connect to mysql server and sql database
//connection.connect(function(err) {
  //  if (err) throw err;
    //run start function after connection is made to prompt the user
   // start();
//});
