# Bamazon

## Overview
Bamazon is an app similar to Amazon. It is a store simulation that allows user to virtually buy items according to how many items are available in stock. 


## Using the App
Bamazon operates through node.js and the mysql database. Mysql provides the inventory of items while node takes care of prompting the user through the shopping experience.


 ## Why is it useful?
 Bamazon is essential for those who would like to shop for products and have their total price calculated.


## Getting Started
Users may get started by first typing "node bamazonCustomer.js" into the command line. The terminal will display a list of items along with their id number and price. The terminal will then prompt the user the id of the product they would like to buy. Following, the user will be asked the number of units of the product they would like to buy. Node will then search the mysql database for the stock quantity of that item and check if there is enough of the product available in stock. If there is, the order will be processed and the terminal will display the user's total price. If there are not enough products to meet the user's request, the user will get a response "INSUFFICIENT QUANTITY!" and their order will be denied.
 



## Links
[GitHub](https://github.com/Katherine890/bamazon)

## DEMO
