const mariadb = require('mariadb');
const database = mariadb.createPool({
        host: 'localhost',
        user:'root',
        password: '',
        database:'bank_senac',
        connectionLimit: 5,
    });


export default database;

database.execute(`
    
CREATE TABLE IF NOT EXISTS user_info (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name_user VARCHAR(50),
    password_user VARCHAR(50),
    total_value DECIMAL(10,2) 
);


`);