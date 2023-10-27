import * as leitor from "readline-sync"

class Livro {
    idLivro: number
    titulo: string
    autor: string
    anoPublicacao: number
    quantidadeDisponivel: number
    constructor(idLivro: number, titulo: string, autor: string, anoPublicacao: number, quantidadeDisponivel: number) {
        this.idLivro = idLivro
        this.titulo = titulo
        this.autor = autor
        this.anoPublicacao = anoPublicacao
        this.quantidadeDisponivel = quantidadeDisponivel
    }
}

class Usuario {
    idUsuario: number
    nome: string
    email: string
    livrosEmprestados: Array<Livro>
    constructor(idUsuario: number, nome: string, email: string) {
        this.idUsuario = idUsuario
        this.nome = nome
        this.email = email
        this.livrosEmprestados = []
    }
}

interface Biblioteca{
    cadastrarLivro(): void
    cadastrarUsuario(): void
    emprestarLivro(): void
    devolverLivro(): void
    consultarLivrosDisponiveis(): void
}

export class SistemaBiblioteca implements Biblioteca{
    usuarios: Array<Usuario>
    livros: Array<Livro>

    constructor(){
        this.usuarios = []
        this.livros = []
    }

    cadastrarLivro(): void {
        let menu = true
        while(menu){
            let idLivro:              number =  leitor.questionInt("Informe o ID do livro: ")
            let titulo:               string =  leitor.question("Informe o título: ")
            let autor:                string =  leitor.question("Informe o autor: ")
            let anoPublicacao:        number =  leitor.questionInt("Informe o ano de publicação: ")
            let quantidadeDisponivel: number =  leitor.questionInt("Qual a quantidade disponível? ")
            
            let livro: Livro = new Livro(idLivro, titulo, autor, anoPublicacao, quantidadeDisponivel)
            
            if (livro) {
                this.livros.push(livro)
                console.log("Livro cadastrado com sucesso!!")
                menu = false
            } else {
                console.log("Ocorreu algum erro, tente novamente!")
            }

        }
    }

    cadastrarUsuario(): void {
        let menu = true
        while(menu){
            let idUsuario:  number = leitor.questionInt("Informe o ID do usuário: ")
            let nome:       string = leitor.question("Informe o nome: ")
            let email:      string = leitor.question("Informe o email: ")
    
            let usuario: Usuario = new Usuario(idUsuario, nome, email)
    
            if (usuario) {
                this.usuarios.push(usuario)
                console.log("Usuário cadastrado com sucesso!!");
                menu = false
            } else {
                console.log("Ocorreu algum erro, tente novamente!");
            }
        }
    }

    emprestarLivro(): void {
        this.usuarios.forEach(user =>{
            console.log(`Identificador: [${user.idUsuario}] - Nome: ${user.nome}`);
        })

        let iduser: number = leitor.questionInt("Insira o ID do usuário: ")
        
        let findUsuario: number = this.usuarios.findIndex(u => u.idUsuario === iduser)
        
        this.livros.forEach(book =>{
            console.log(`Identificador: [${book.idLivro} - Título: ${book.titulo}]`);
        })

        let idbook: number = leitor.questionInt("Insira o ID do livro: ")

        let findLivro: number = this.livros.findIndex(l => l.idLivro === idbook)

        if (findLivro && findUsuario) {

            if (this.usuarios[findUsuario].livrosEmprestados.length < 3 && this.livros[findLivro].quantidadeDisponivel > 0) {

                console.log(`Livro ${this.livros[findLivro].titulo} emprestado para ${this.usuarios[findUsuario].nome} com sucesso!`);
                this.livros[findLivro].quantidadeDisponivel -= 1
                this.usuarios[findUsuario].livrosEmprestados.push(this.livros[findLivro])
                
            } else if (this.livros[findLivro].quantidadeDisponivel <= 0) {
                
                console.log(`Livro indisponível para empréstimo`);
                
            } else {

                console.log(`Quantidade de livros emprestados excedida, por favor devolva os livros necessários.`);

            }

        } else if (!findLivro) {
    
            console.log(`Livro não encontrado`);
    
        } else if (!findUsuario) {
            
            console.log(`Usuário não encontrado`);
            
        } else {

            console.log(`Ocorreu algum erro, tente novamente!`);
            
        }
    }

    devolverLivro(): void {
        this.usuarios.forEach(user =>{
            console.log(`Identificador: [${user.idUsuario}] - Nome: ${user.nome}`);
        })

        let iduser: number = leitor.questionInt("Insira o ID do usuário: ")

        let findUsuario: number = this.usuarios.findIndex(u => u.idUsuario === iduser)

        this.usuarios[findUsuario].livrosEmprestados.forEach(books =>{
            console.log(`Identificador: [${books.idLivro} - Título: ${books.titulo}]`);
        })

        let idbook: number = leitor.questionInt("Insira o ID do livro para devolução: ")

        let findLivro: number = this.livros.findIndex(l => l.idLivro === idbook)

        if (findLivro && findUsuario) {

            this.usuarios[findUsuario].livrosEmprestados.splice(findLivro, 1)
            this.livros[findLivro].quantidadeDisponivel += 1
            console.log(`Livro devolvido com sucesso`);

        } else if (!findLivro) {
    
            console.log(`Livro não encontrado`);
    
        } else if (!findUsuario) {
            
            console.log(`Usuário não encontrado`);
            
        } else {

            console.log(`Ocorreu algum erro, tente novamente!`);
            
        }
    }

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

}
