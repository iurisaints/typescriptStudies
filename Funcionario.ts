class Funcionario {
    private nome: string;
    private idade: number;
    private salario: number;

    constructor(nome: string, idade: number, salario: number) {
        this.nome = nome;
        this.idade = idade;
        this.salario = salario;
    }

    // Método para exibir os detalhes do funcionário
    exibirDetalhes(): void {
        console.log(`Nome: ${this.nome}, Idade: ${this.idade}, Salário: $${this.salario}`);
    }
}

class Vendedor extends Funcionario {
    private comissao: number;

    constructor(nome: string, idade: number, salario: number, comissao: number) {
        super(nome, idade, salario); // Chama o construtor da classe base
        this.comissao = comissao;
    }

    // Método para calcular o salário total do vendedor com comissão
    calcularSalarioTotal(): number {
        return this.salario + this.comissao;
    }

    // Método para exibir os detalhes do vendedor, incluindo a comissão
    exibirDetalhes(): void {
        super.exibirDetalhes(); // Chama o método da classe base
        console.log(`Comissão: $${this.comissao}`);
    }
}

// Exemplo de uso:
const funcionario1 = new Funcionario("João", 30, 3000);
const vendedor1 = new Vendedor("Maria", 25, 2500, 500);

console.log("Detalhes do Funcionário:");
funcionario1.exibirDetalhes();

console.log("\nDetalhes do Vendedor:");
vendedor1.exibirDetalhes();
console.log(`Salário Total: $${vendedor1.calcularSalarioTotal()}`);
