import * as leitor from "readline-sync"
class Carro{
    marca: String
    modelo: String
    ano: number
    placa: String

    constructor(marca: String, modelo: String, ano: number, placa: String){
        this.marca = marca
        this.modelo = modelo
        this.ano = ano
        this.placa = placa
    }
}

export class Garagem{
    carros: Array<Carro>
    constructor(){
        this.carros = []
    }

    addCarro(): void{
        let marca = leitor.question("Informe a marca do seu carro: ")
        let modelo = leitor.question("Informe o modelo do seu carro: ")
        let ano = leitor.question("Informe o ano do seu carro: ")
        let placa = leitor.question("Informe a placa do seu carro: ")
        let carro = new Carro(marca, modelo, ano, placa)
        this.carros.push(carro)
        console.log(`${carro.toString()} foi adicionado à garagem`);
    }

    removerCarro(): void{
        let placa = leitor.question("Informe a placa do carro a ser removido: ")
        const index = this.carros.indexOf(placa)
        this.carros.splice(index, 1)
        console.log(`Carro com a placa: ${placa} foi removido da garagem`);
    }

    getGaragem(): void{
        console.log("Carros na garagem: ", this.carros)
        }
    }
