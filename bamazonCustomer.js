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
    start();
});

function start() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res, null, 2));
        inquirer
            .prompt({
                name: "productId",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false,
                            console.log(" \n PLEASE ENTER A VALID ID NUMBER");
                    }
                },
                type: "input",
                // choices: function (value) {
                //   var choiceArray = [];
                // for (var i = 0; i < res.length; i++) {
                //   choiceArray.push(res[i].item_id);
                //}
                //return choiceArray;
                //},
                message: "WHAT IS THE ID OF THE PRODUCT YOU WOULD LIKE TO BUY?",


            }).then(function (answer) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id == answer.productId) {
                        var chosenItem = res[i];
                        inquirer
                            .prompt({

                                name: "chosen_Quantity",
                                type: "input",
                                message: "HOW MANY UNITS OF THIS PRODUCT WOULD YOU LIKE TO BUY?",
                                validate: function (value) {
                                    if (isNaN(value) == false) {
                                        return true;
                                    } else {
                                        return false,
                                            console.log(" \n PLEASE ENTER A NUMBER");
                                    }
                                }
                            })
                            .then(function (answer) {

                                if (parseInt(answer.chosen_Quantity) < chosenItem.stock_quantity) {
                                    // There is enough quantity, update the db.
                                    connection.query(
                                        "SELECT * FROM products",
                                        "UPDATE auctions SET ? WHERE ?",
                                        [
                                            {
                                                stock_quantity: answer.chosen_Quantity
                                            },
                                            {
                                                item_id: chosenItem.item_id
                                            }
                                        ],
                                        function (error) {
                                            if (error) throw err;
                                            console.log("PURCHASE SUCCESSFUL!");
                                            //  start();
                                        }
                                    );
                                }
                                else {
                                    // Not enough products in stock
                                    console.log("INSUFFICIENT QUANTITY!");
                                    //start();
                                }

                            })
                    }


                }
            })




    })


};


