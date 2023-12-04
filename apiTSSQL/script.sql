-- Criação do banco de dados
CREATE DATABASE OnlineStore;

-- Seleção do banco de dados recém-criado
USE OnlineStore;

-- Criação das tabelas
CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255),
    instock_quantity INT,
    price DECIMAL(8, 2)
);

CREATE TABLE Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

CREATE TABLE ProductOrder (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    product_quantity INT,
    FOREIGN KEY (product_id) REFERENCES Product(id),
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- Exemplo de inserção de dados nas tabelas criadas
INSERT INTO Product VALUES (1, "Apple MacBook Pro", "15 inch, i7, 16GB RAM", 5, 667.00);
INSERT INTO Customer VALUES (1, "Anjalee", "2w33he94yg4mx88j9j2hy4uhd32w", "anjalee@gmail.com");
INSERT INTO ProductOrder VALUES (1, 1, 1, 1);