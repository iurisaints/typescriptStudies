export class Funcionario{
    protected nome: string;
    protected idade: number;
    protected salario: number;

    constructor(nome: string, idade: number, salario: number){
        this.idade = idade
        this.nome = nome
        this.salario = salario
    }

    exibirDetalhes(): void{
        console.log(`Nome: ${this.nome}`);
        console.log(`Idade: ${this.idade}`);
        console.log(`Salario: ${this.salario}`);
    }
}

export class Vendedor extends Funcionario{
    private comissao: number;

    constructor(nome: string, idade: number, salario: number, comissao: number){
        super(nome, idade, salario)
        this.comissao = comissao
    }

    calcularSalario(){
        this.salario += this.comissao
    }

    exibirDetalhes(): void{
        super.exibirDetalhes()
        console.log(`Comissão: ${this.comissao}`);
    }

}