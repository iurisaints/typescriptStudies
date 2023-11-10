import mariadb from 'mariadb';

const banco = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'farmacia',
    connectionLimit: 10
})

export default banco;

banco.execute(`
    CREATE DATABASE IF NOT EXISTS farmacia;
`)

banco.execute(`
    CREATE TABLE IF NOT EXISTS medicamentos(
        id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
        nome_medicamento VARCHAR(50) NOT NULL,
        quantidadeEmEstoque INT NOT NULL,
        precoPorUnidade INT NOT NULL
    );
`)

banco.execute(`
    CREATE TABLE IF NOT EXISTS financeiro(
        saldo DECIMAL(10,2)
    );   
`)

banco.execute(`
        CREATE TABLE IF NOT EXISTS clientes(
            id_cliente INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            nome_cliente VARCHAR(50) NOT NULL,
            documento VARCHAR(50)
        );
`)

banco.execute(`
    CREATE TABLE IF NOT EXISTS vendas(
        id_venda INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        id_medicamento INT NOT NULL,
        id_cliente INT,
        FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento),
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    );   
`)