import * as leitor from "readline-sync"

class Medicamento {
    public nome: String;
    public qtdEstoque: number;
    public preco: number;


    constructor(nome: String, qtdEstoque: number, preco: number) {
        this.nome = nome
        this.qtdEstoque = qtdEstoque
        this.preco = preco
    }
}

export class Farmacia {
    private medicamentos: Array<Medicamento>;
    constructor() {
        this.medicamentos = []
    }
    
    // Venda de Medicamentos
    public venderMedicamento(): void {
        let nome = leitor.question("Informe o nome do medicamento a ser vendido")
        let qtd = leitor.questionInt("A quantidade a ser vendida")
        const medicamento = this.medicamentos.find((m) => m.nome === nome);
        if (medicamento) {
            if (medicamento.qtdEstoque >= qtd) {
                medicamento.qtdEstoque -= qtd;
                console.log(`Venda realizada: ${qtd} unidades de ${medicamento.nome}`);
            } else {
                console.log(`Estoque insuficiente para a venda de ${qtd} unidades de ${medicamento.nome}`);
            }
        } else {
            console.log(`Medicamento ${nome} não encontrado.`);
        }
    }

    // Compra de Medicamentos
    public comprarMedicamento(): void {
        let nome = leitor.question("Informe o nome do medicamento a ser vendido")
        let qtd = leitor.questionInt("A quantidade a ser vendida")
        let preco = leitor.questionInt("Informe o valor da medicação")
        const medicamento = this.medicamentos.find((m) => m.nome === nome);
        if (medicamento) {
            medicamento.qtdEstoque += qtd;
            medicamento.preco = preco;
        } else {
            //mostrar essa lógica primeiro para os alunos, depois complementa com o if e else
            const novoMedicamento = new Medicamento(nome, qtd, preco);
            this.medicamentos.push(novoMedicamento);
        }
        console.log(`Compra realizada: ${qtd} unidades de ${nome}`);
    }

    // Substituição de Medicamento
    public substituirMedicamento(): void {
        let nomeAntigo = leitor.question("Informe o nome do remedio a ser substituido: ")
        let nomeNovo = leitor.question("Informe o nome do medicamento a ser inserido: ")
        let qtd = leitor.questionInt("A quantidade a ser inserida: ")
        let preco = leitor.questionInt("Informe o valor da medicação: ")
        const medicamentoAntigo = this.medicamentos.find((m) => m.nome === nomeAntigo);
        if (medicamentoAntigo) {
            medicamentoAntigo.qtdEstoque -= qtd;
            const medicamentoNovo = new Medicamento(nomeNovo, qtd, preco);
            this.medicamentos.push(medicamentoNovo);
            console.log(`Substituição realizada: ${qtd} unidades de ${nomeAntigo} por ${qtd} unidades de ${nomeNovo}`);
        } else {
            console.log(`Medicamento ${nomeAntigo} não encontrado para substituição.`);
        }
    }

    // Remoção de Medicamento
    public removerMedicamento(): void {
        let nome = leitor.question("Informe o nome do remedio a ser removido: ")
        const index = this.medicamentos.findIndex((m) => m.nome === nome);
        if (index !== -1) {
            this.medicamentos.splice(index, 1);
            console.log(`Medicamento ${nome} removido do estoque.`);
        } else {
            console.log(`Medicamento ${nome} não encontrado para remoção.`);
        }
    }

    // Inserção de Medicamentos
    public inserirMedicamento(): void {
        let nome = leitor.question("Informe o nome do medicamento a ser inserido: ")
        let qtd = leitor.questionInt("A quantidade a ser inserida: ")
        let preco = leitor.questionInt("Informe o valor da medicação: ")
        let medicamento: Medicamento = new Medicamento(nome, qtd, preco)
        this.medicamentos.push(medicamento);
        console.log(`Medicamento ${medicamento.nome} inserido no estoque.`);
    }

    // Visualização do Estoque
    public visualizarEstoque(): void {
        console.log('Estoque de Medicamentos:');
        this.medicamentos.forEach((medicamento) => {
            console.log(`Nome: ${medicamento.nome}, Quantidade: ${medicamento.qtdEstoque}, Preço: ${medicamento.preco}`);
        });
    }
}