import * as leitor from "readline-sync"
import banco from "./db"

class Livro {
    titulo: string
    autor: string
    anoPublicacao: number
    quantidadeDisponivel: number
    constructor(titulo: string, autor: string, anoPublicacao: number, quantidadeDisponivel: number) {
        this.titulo = titulo
        this.autor = autor
        this.anoPublicacao = anoPublicacao
        this.quantidadeDisponivel = quantidadeDisponivel
    }
}

class Usuario {
    nome: string
    email: string
    constructor(nome: string, email: string) {
        this.nome = nome
        this.email = email
    }
}

export class SistemaBiblioteca {
    usuarios: Array<Usuario>
    livros: Array<Livro>

    constructor(){
        this.usuarios = []
        this.livros = []
    }

    cadastrarLivro(): void {
            let titulo:               string =  leitor.question("Informe o título: ")
            let autor:                string =  leitor.question("Informe o autor: ")
            let anoPublicacao:        number =  leitor.questionInt("Informe o ano de publicação: ")
            let quantidadeDisponivel: number =  leitor.questionInt("Qual a quantidade disponível? ")
            
            let livro: Livro = new Livro(titulo, autor, anoPublicacao, quantidadeDisponivel)

            this.criarLivroBanco(livro)
    }

    async criarLivroBanco(livro: Livro): Promise<void>{
        try {
            await executeDatabaseQuery(`INSERT INTO livros (titulo, autor, anoPublicacao, quantidadeDisponivel) VALUES (?, ?, ?, ?)`, [livro.titulo, livro.autor, livro.anoPublicacao, livro.quantidadeDisponivel])
            console.log(`\nLivro: ${livro.titulo} inserido no BD com sucesso!`);
        } catch (err) {
            console.log('Erro: ', err);
        }
    }

    cadastrarUsuario(): void {
            let nome:       string = leitor.question("Informe o nome: ")
            let email:      string = leitor.question("Informe o email: ")
    
            let usuario: Usuario = new Usuario(nome, email)
            this.criarUsuarioBanco(usuario)
    }

    async criarUsuarioBanco(usuario: Usuario): Promise<void> {
        try {
            await executeDatabaseQuery(`INSERT INTO usuarios (nome, email) VALUES (?, ?)`, [usuario.nome, usuario.email])
            console.log(`\nUsuario: ${usuario.nome} inserido no BD com sucesso!`);
        } catch (err) {
            console.log("Erro: ", err);
        }
    }

    async emprestarLivro(): Promise<void>{
        await this.usuariosBanco()
        let id_usuario = leitor.questionInt("Insira o ID do usuario: ")

        await this.livrosBanco()
        let id_livro = leitor.questionInt("Insira o ID do livro: ")

        try {
            //inserir o emprestimo
            await executeDatabaseQuery(`INSERT INTO sistemabiblioteca(id_usuario, id_livro) VALUES (?, ?);`,[id_usuario, id_livro] )
            //atualizar a quantidade disponivel dos livros
            await executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ?`, [id_livro])
            console.log("Livro emprestado com sucesso");
            
        } catch (err) {
            console.log("Erro: ", err);
        }
        
    }

    async devolverLivro(): Promise<void> {
        await this.emprestimosBanco()
        let idEmprestimo = leitor.questionInt("Insira o ID do emprestimo: ")

        try {
            console.log(await executeDatabaseQuery("SELECT id_livro FROM sistemabiblioteca WHERE id_biblioteca = ?", [idEmprestimo]))
        } catch (err) {
            console.log("Erro: ", err);
        }

        let idLivro = leitor.questionInt("Informe o ID do livro que foi mostrado acima para confirmar: ")

        try {
            // deletar dos dados de emprestimo
            await executeDatabaseQuery(`DELETE FROM sistemabiblioteca WHERE id_biblioteca = ?`, [idEmprestimo])
            // atualizar a quantidade em estoque do livro
            await executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel + 1 WHERE id_livro = ?`, [idLivro])
        } catch (err) {
            console.log("Erro: ", err);
        }

    }

    async deletarUsuario(): Promise<void>{
        await this.usuariosBanco()
        let id_usuario = leitor.questionInt("Informe o ID do usuario a ser deletado: ")

        try {
            await executeDatabaseQuery("DELETE FROM usuarios WHERE id_usuario = ?", [id_usuario])
            console.log(`Usuario deletado com sucesso`);
        } catch (err) {
            console.log(`Erro: `, err);
        }
    }

    async deletarLivro(): Promise<void>{
        await this.livrosBanco()
        let id_livro = leitor.questionInt("Informe o ID do livro a ser deletado: ")

        try {
            await executeDatabaseQuery("DELETE FROM livros WHERE id_livro = ?", [id_livro])
            console.log(`Livro deletado com sucesso`);
        } catch (err) {
            console.log(`Erro: `, err);
        }
    }
    
    // getters
    
    async visualizarLivros(): Promise<void>{
        await this.livrosBanco()
    }

    async usuariosBanco(): Promise<void> {
        try {
            const usuarios = await executeDatabaseQuery("SELECT * FROM usuarios", [])
            console.log('Base de dados de Usuarios: ');
            return usuarios.forEach(({id_usuario, nome, email}: any) => {
                console.log(`ID: ${id_usuario}, Nome: ${nome}, Email: ${email}`);
            })
        } catch (err) {
            console.log("Erro: ", err);
        }
    }

    async livrosBanco(): Promise<void> {
        try {
            const livros = await executeDatabaseQuery("SELECT * FROM livros", [])
            console.log(`Base de dados dos livros: `);
            return livros.forEach(({id_livro, titulo, autor, quantidadeDisponivel}: any) => {
                console.log(`ID: ${id_livro}, Titulo: ${titulo}, Autor: ${autor}, Quantidade Disponivel: ${quantidadeDisponivel}`);
                
            })            
        } catch (err) {
            console.log("Erro: ", err);
        }
    }

    async emprestimosBanco(): Promise<void>{
        try {
            const emprestimos = await executeDatabaseQuery(`
            SELECT sistemabiblioteca.id_biblioteca, usuarios.nome, livros.titulo
            FROM sistemabiblioteca
            INNER JOIN usuarios ON usuarios.id_usuario = sistemabiblioteca.id_usuario
            INNER JOIN livros ON livros.id_livro = sistemabiblioteca.id_livro
            `, [])

            console.log(`Livros emprestados: `);
            emprestimos.forEach(({id_biblioteca, nome, titulo}: any) =>{
                console.log(`ID do Emprestimo: ${id_biblioteca}, Usuario: ${nome}, Livro: ${titulo}`);
            })
        } catch (err) {
            console.log("Erro: ", err);
        }
    }



}

async function executeDatabaseQuery(query: string, params: any[]): Promise<any> {
    try {
        const result = await banco.execute(query, params)
        return result
    } catch (err) {
        console.error('Erro na execucao da consulta', err);
        throw err
    }
}