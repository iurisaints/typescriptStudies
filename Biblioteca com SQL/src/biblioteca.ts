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
        
        this.encontrarLivro(idEmprestimo)

        this.devolverBanco(idEmprestimo)
    }

    async devolverBanco(idEmprestimo: number): Promise<void> {
        try {
          await executeDatabaseQuery(`DELETE FROM sistemabiblioteca WHERE id_biblioteca = ?;`, [idEmprestimo]);
          await executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ? `,[livro])
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

      async encontrarLivro(idEmprestimo: number): Promise<void> {
        try {
            const livro = await executeDatabaseQuery("SELECT id_livro FROM sistemabiblioteca WHERE", []);
      
          } catch (err) {
            console.error('Erro:', err);
          }
      }

/*
    consultarLivrosDisponiveis(): void {

        this.livros.forEach(books => {
            console.log(`Livro: ${books.titulo}`);
            console.log(`Autor: ${books.autor}`);
            console.log(`Ano de Publicação: ${books.anoPublicacao}`);
            console.log(`Quantidade disponível: ${books.quantidadeDisponivel}\n`);
        })

    }

    deleteUsuario(): void{
        this.usuarios.forEach(user =>{
            console.log(`Identificador: [${user.idUsuario}] - Nome: ${user.nome}`);
        })

        let iduser: number = leitor.questionInt("Insira o ID do usuário: ")

        let findUsuario: number = this.usuarios.findIndex(u => u.idUsuario === iduser)

        if (findUsuario) {
            this.usuarios.splice(findUsuario, 1)
        } else {
            console.log(`Usuário não encontrado!`);
        }
    }

    deleteLivros(): void{

        this.livros.forEach(book =>{
            console.log(`Identificador: [${book.idLivro} - Título: ${book.titulo}]`);
        })

        let idbook: number = leitor.questionInt("Insira o ID do livro: ")

        let findLivro: number = this.livros.findIndex(l => l.idLivro === idbook)

        if (findLivro) {
            this.livros.splice(findLivro, 1)
        }else {
            console.log(`Livro não encontrado!`);
        }
    }

    baseDadosLivros(){
        let livroum     = new Livro(1, "Dom Quixote", "Miguel de Cervantes", 1605, 5)
        let livrodois   = new Livro(2, "Em Busca do Tempo Perdido", "Marcel Proust", 1913, 7)
        let livrotres   = new Livro(3, "Crime e Castigo", "Fiódor Dostoiévski", 1866, 3)
        let livroquatro = new Livro(4, "Cem Anos de Solidão", "Gabriel García Márquez", 1967, 8)
        let livrocinco  = new Livro(5, "Orgulho e Preconceito", "Jane Austen", 1813, 10)
        let livroseis   = new Livro(6, "1984", "George Orwell", 1949, 2)
        let livrosete   = new Livro(7, "O Grande Gatsby", "F. Scott Fitzgerald", 1925, 6)
        let livrooito   = new Livro(8, "Ulisses", "James Joyce", 1922, 4)
        let livronove   = new Livro(9, "Apanhador no Campo de Centeio", "J.D. Salinger", 1951, 9)
        let livrodez    = new Livro(10, "A Metamorfose", "Franz Kafka", 1915, 1)
        this.livros.push(livroum, livrodois, livrotres, livroquatro, livrocinco, livroseis, livrosete, livrooito, livronove, livrodez)
    }

    baseDadosUsuarios(){
            let userum     = new Usuario(1, "João Silva", "joao@gmail.com")
            let userdois   = new Usuario(2, "Maria Santos", "maria@gmail.com")
            let usertres   = new Usuario(3, "José Pereira", "jose@gmail.com")
            let userquatro = new Usuario(4, "Ana Júlia", "ana@gmail.com")
            let usercinco  = new Usuario(5, "Paulo Lima", "paulo@gmail.com")
            let userseis   = new Usuario(6, "Camila Ferreira", "camila@hotmail.com")
            let usersete   = new Usuario(7, "Fernando Alves", "fernando@hotmail.com")
            let useroito   = new Usuario(8, "Sofia Oliveira", "sofia@hotmail.com")
            let usernove   = new Usuario(9, "Lucas Rodrigues", "lucas@hotmail.com")
            let userdez    = new Usuario(10, "Mariana Pereira", "mariana@hotmail.com")
            this.usuarios.push(userum, userdois, usertres, userquatro, usercinco, userseis, usersete, useroito, usernove, userdez)
    }

    */
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