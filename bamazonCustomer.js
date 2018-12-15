require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
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
var currentitemId; // chosen product id
var chosenItem;    // chosen item

function start() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer
            .prompt([
                {
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
                    message: "WHAT IS THE ID OF THE PRODUCT YOU WOULD LIKE TO BUY?",
                },
                {
                    name: "chosen_Quantity",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false,
                                console.log(" \n PLEASE ENTER A NUMBER");
                        }
                    },
                    type: "input",
                    message: "HOW MANY UNITS OF THIS PRODUCT WOULD YOU LIKE TO BUY?",

                }

            ])
            .then(function (answer) {
                var newcurrentItem;

                //get info for the chosen product id
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id == answer.productId) {
                        chosenItem = res[i];
                        currentitemId = res[i].item_id;   // The current id we choose

                        connection.query(
                            "SELECT * FROM products", function (err, res) {
                                if (err) throw err;
                                newcurrentItem = res.filter(function (item) {
                                    return item.item_id === currentitemId;

                                })
                               // console.log("chosenItem2", newcurrentItem[0].stock_quantity);

                                if (parseInt(answer.chosen_Quantity) < newcurrentItem[0].stock_quantity) {

                                    // There is enough quantity, update the db.
                                        connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                            {
                                                stock_quantity: newcurrentItem[0].stock_quantity - answer.chosen_Quantity
                                            },
                                            {
                                                item_id: chosenItem.item_id
                                            }
                                        ],
                                        function (error) {
                                            if (error) throw err;
                                            var totalPrice = (newcurrentItem[0].price * answer.chosen_Quantity)
                                            console.log("ORDER PROCESSED!");
                                            console.log(chosenItem);
                                            console.log("YOUR TOTAL IS:" + totalPrice)
                                            start();
                                        }
                                        // );
                                    )
                                }
                                else {
                                    // Not enough products in stock
                                    console.log("INSUFFICIENT QUANTITY!");
                                    start();
                                }


                            }
                        )
                    }
                }

            })




    })


};


