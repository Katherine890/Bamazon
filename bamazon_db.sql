DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT(11),
  stock_quantity INT(11),
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Apple Watch", "Electronics", 300, 50);  

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Joggers", "Clothing", 20, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Waffle Maker", "Home & Kitchen", 30, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Printer", "Electronics", 100, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Whey Protein", "Health", 50, 150);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Nerf Blaster", "Toys", 25, 300);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Blender", "Home & Kitchen", 60, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Piano", "Musical Instruments", 1000, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Harry Potter Novels", "Books", 55, 70);
 
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Lego Builders", "Toys", 27, 200);
