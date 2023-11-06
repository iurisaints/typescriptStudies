CREATE DATABASE bank_senac;

USE bank_senac;


CREATE TABLE IF NOT EXISTS user_info (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name_user VARCHAR(50),
    password_user VARCHAR(50),
    total_value DECIMAL(10,2) 
);




SHOW CREATE TABLE user_info;

