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
    livrosEmprestados: Array<Livro>
    constructor(nome: string, email: string) {
        this.nome = nome
        this.email = email
        this.livrosEmprestados = []
    }
}
/*
interface Biblioteca{
    cadastrarLivro(): void
    cadastrarUsuario(): void
    emprestarLivro(): void
    devolverLivro(): void
    consultarLivrosDisponiveis(): void
}
*/
export class SistemaBiblioteca /*implements Biblioteca*/{
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

    async criarLivroBanco(livro: Livro): Promise<void> {
        try {
          await executeDatabaseQuery(`INSERT INTO livros (titulo, autor, anoPublicacao, quantidadeDisponivel) VALUES (?, ?, ?, ?)`, [livro.titulo, livro.autor, livro.anoPublicacao, livro.quantidadeDisponivel]);
          console.log(`\nLivro ${livro.titulo} inserido na base de dados com sucesso!\n`);
        } catch (err) {
          console.log('Erro', err);
        }
      }

    cadastrarUsuario(): void {
            let nome:       string = leitor.question("Informe o nome: ").toUpperCase()
            let email:      string = leitor.question("Informe o email: ").toLowerCase()
    
            let usuario: Usuario = new Usuario(nome, email)

            this.criarUsuarioBanco(usuario)
    }

    async criarUsuarioBanco(usuario: Usuario): Promise<void> {
        try {
          await executeDatabaseQuery(`INSERT INTO usuarios(nome, email) VALUES (?, ?)`, [usuario.nome, usuario.email]);
          console.log(`\nUsuario ${usuario.nome} inserido na base de dados com sucesso!\n`);
        } catch (err) {
          console.log('Erro', err);
        }
      }

    async emprestarLivro(): Promise<void> {
        const listaUsuarios = await this.usuariosBanco()

        console.log(listaUsuarios);

        let idUsuario: number = leitor.questionInt("Insira o ID do usuário: ")
        
        const listaLivros = await this.livrosBanco();

        console.log(listaLivros);

        let idLivro: number = leitor.questionInt("Insira o ID do livro: ")

        this.emprestarBanco(idUsuario, idLivro)
    }

    async emprestarBanco(usuario: number, livro: number): Promise<void> {
        try {
          await executeDatabaseQuery(`INSERT INTO sistemabiblioteca(id_usuario, id_livro) VALUES (?, ?);`, [usuario, livro]);
          await executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ? `,[livro])
          console.log(`\nLivro emprestado com sucesso!\n`);
        } catch (err) {
          console.log('Erro', err);
        }
      }

      
    async devolverLivro(): Promise<void> {
        const listaEmprestimos = await this.emprestimosBanco()

        console.log(listaEmprestimos);
        
        let idEmprestimo: number = leitor.questionInt("Insira o ID do emprestimo: ")
        
        let idLivro = this.encontrarLivro(idEmprestimo)

        this.devolverBanco(idEmprestimo, idLivro)
    }

    async devolverBanco(idEmprestimo: number, idLivro: any): Promise<void> {
        try {
          await executeDatabaseQuery(`DELETE FROM sistemabiblioteca WHERE id_biblioteca = ?;`, [idEmprestimo]);
          await executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ?;`,[idLivro])
          console.log(`\nLivro devolvido com sucesso!\n`);
        } catch (err) {
          console.log('Erro', err);
        }
      }

    async usuariosBanco(): Promise<void> {
        try {
          const usuarios = await executeDatabaseQuery("SELECT * FROM usuarios", []);
    
          console.log(`Base de dados dos Usuarios:`);
          return usuarios.forEach(({ id_usuario, nome, email }: any) => {
            console.log(`Id: ${id_usuario}, Nome do usuario: ${nome}, Email: ${email}`);
          });

        } catch (err) {
          console.error('Erro:', err);
        }
      }

      async livrosBanco(): Promise<void> {
        try {
          const livros = await executeDatabaseQuery("SELECT * FROM livros", []);
          console.log(`Base de dados dos Livros:`);
          livros.forEach(({ id_livro, titulo, autor }: any) => {
            console.log(`Id: ${id_livro}, Titulo: ${titulo}, Autor: ${autor}`);
          });
    
        } catch (err) {
          console.error('Erro:', err);
        }
      }

      async emprestimosBanco(): Promise<void> {
        try {
          const emprestimos = await executeDatabaseQuery("SELECT sistemabiblioteca.id_biblioteca, usuarios.nome, livros.titulo FROM sistemabiblioteca INNER JOIN usuarios ON usuarios.id_usuario = sistemabiblioteca.id_usuario INNER JOIN livros ON livros.id_livro = sistemabiblioteca.id_livro", []);
    
          console.log(`Base de dados dos Emprestimos:`);
          emprestimos.forEach(({ idEmprestimo, nome, titulo }: any) => {
            console.log(`ID do Emprestimo: ${idEmprestimo} \nUsuario: ${nome} \nLivro: ${titulo}`);
          });
    
        } catch (err) {
          console.error('Erro:', err);
        }
      }

      async encontrarLivro(idEmprestimo: number): Promise<number> {
        try {
            const livro = await executeDatabaseQuery("SELECT id_livro FROM sistemabiblioteca WHERE id_biblioteca = ?", [idEmprestimo]);
            return livro
          } catch (err) {
            console.error('Erro:', err);
            return -1
          }
      }

      async deletarUsuario(): Promise<void> {
        
        const listaUsuarios = await this.usuariosBanco()
        console.log(listaUsuarios);
        let idUsuario: number = leitor.questionInt("Insira o ID do usuário a ser deletado: ")
      
        try {
          await executeDatabaseQuery("DELETE FROM usuarios WHERE id_usuario = ?", [idUsuario])
          console.log("Usuario deletado com sucesso!");
        } catch (err) {
          console.error('Erro: ', err)
        }
      }

      async visualizarLivros(): Promise<void> {
        const listaLivros = await this.livrosBanco()
        console.log(listaLivros);
      }

      async deletarLivro(): Promise<void> {
        
        const listaLivros = await this.livrosBanco()
        console.log(listaLivros);
        let idLivro: number = leitor.questionInt("Insira o ID do livro a ser deletado: ")
      
        try {
          await executeDatabaseQuery("DELETE FROM livros WHERE id_livro = ?", [idLivro])
          console.log("Livro deletado com sucesso!");
        } catch (err) {
          console.error('Erro: ', err)
        }
      }

}

async function executeDatabaseQuery(query: string, params: any[]): Promise<any> {
    try {
      const result = await banco.execute(query, params);
      return result;
    } catch (err) {
      console.error('Erro na execução da consulta:', err);
      throw err;
    }
  }
