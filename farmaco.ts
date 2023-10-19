class Medicamento {
    constructor(public nome: string, public quantidadeEmEstoque: number, public precoPorUnidade: number) {}
}

class Farmacia {
    private medicamentos: Medicamento[] = [];

    vendaMedicamento(nome: string, quantidadeVendida: number): void {
        const medicamento = this.buscarMedicamentoPorNome(nome);

        if (medicamento) {
            if (medicamento.quantidadeEmEstoque >= quantidadeVendida) {
                medicamento.quantidadeEmEstoque -= quantidadeVendida;
                console.log(`Vendidos ${quantidadeVendida} unidades de ${nome}`);
            } else {
                console.log(`Estoque insuficiente para vender ${quantidadeVendida} unidades de ${nome}`);
            }
        } else {
            console.log(`Medicamento ${nome} não encontrado`);
        }
    }

    compraMedicamento(nome: string, quantidadeComprada: number, precoPorUnidade: number): void {
        const medicamento = this.buscarMedicamentoPorNome(nome);

        if (medicamento) {
            medicamento.quantidadeEmEstoque += quantidadeComprada;
            medicamento.precoPorUnidade = precoPorUnidade;
            console.log(`Comprados ${quantidadeComprada} unidades de ${nome}`);
        } else {
            const novoMedicamento = new Medicamento(nome, quantidadeComprada, precoPorUnidade);
            this.medicamentos.push(novoMedicamento);
            console.log(`Medicamento ${nome} não encontrado. Criado novo medicamento.`);
        }
    }

    substituirMedicamento(nomeAntigo: string, nomeNovo: string, quantidade: number, preco: number): void {
        const medicamentoAntigo = this.buscarMedicamentoPorNome(nomeAntigo);

        if (medicamentoAntigo) {
            medicamentoAntigo.nome = nomeNovo;
            medicamentoAntigo.quantidadeEmEstoque = quantidade;
            medicamentoAntigo.precoPorUnidade = preco;
            console.log(`Medicamento ${nomeAntigo} substituído por ${nomeNovo}`);
        } else {
            console.log(`Medicamento ${nomeAntigo} não encontrado para substituição.`);
        }
    }

    removerMedicamento(nome: string): void {
        const index = this.medicamentos.findIndex(med => med.nome === nome);

        if (index !== -1) {
            this.medicamentos.splice(index, 1);
            console.log(`Medicamento ${nome} removido do estoque.`);
        } else {
            console.log(`Medicamento ${nome} não encontrado para remoção.`);
        }
    }

    inserirMedicamento(nome: string, quantidade: number, preco: number): void {
        const novoMedicamento = new Medicamento(nome, quantidade, preco);
        this.medicamentos.push(novoMedicamento);
        console.log(`Medicamento ${nome} inserido no estoque.`);
    }

    visualizarEstoque(): void {
        console.log("Estoque da farmácia:");
        this.medicamentos.forEach(medicamento => {
            console.log(`${medicamento.nome} - Quantidade: ${medicamento.quantidadeEmEstoque}, Preço por unidade: ${medicamento.precoPorUnidade}`);
        });
    }

    private buscarMedicamentoPorNome(nome: string): Medicamento | undefined {
        return this.medicamentos.find(med => med.nome === nome);
    }
}

// Exemplo de uso:
const farmacia = new Farmacia();

farmacia.inserirMedicamento("Paracetamol", 100, 5.0);
farmacia.inserirMedicamento("Aspirina", 50, 4.0);

farmacia.visualizarEstoque();

farmacia.vendaMedicamento("Paracetamol", 20);
farmacia.vendaMedicamento("Ibuprofeno", 10);

farmacia.compraMedicamento("Paracetamol", 30, 4.5);
farmacia.compraMedicamento("Dipirona", 60, 3.0);

farmacia.substituirMedicamento("Aspirina", "Ácido Acetilsalicílico", 40, 5.0);
farmacia.substituirMedicamento("Paracetamol", "Paracetamol Genérico", 70, 3.0);

farmacia.removerMedicamento("Ibuprofeno");

farmacia.visualizarEstoque();
