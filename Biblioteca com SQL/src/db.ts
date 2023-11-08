var mariadb = require("mariadb")

const banco = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 5000,
    database: 'biblioteca',
    waitForConnections: true,
    connectionLimit: 10
})

export default banco;

banco.execute(`
    CREATE DATABASE IF NOT EXISTS biblioteca;
`)

banco.execute(`
    CREATE TABLE IF NOT EXISTS livros(
        id_livro INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(50) NOT NULL,
        autor VARCHAR(50) NOT NULL,
        anoPublicacao INT NOT NULL,
        quantidadeDisponivel INT NOT NULL
    );
`)

banco.execute(`
    CREATE TABLE IF NOT EXISTS usuarios(
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL
    );   
`)

banco.execute(`
    CREATE TABLE IF NOT EXISTS sistemabiblioteca(
        id_biblioteca INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_livro INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
        FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
    );   
`)