import { Farmacia } from "./Farmacia";
import * as leitor from "readline-sync";

const farmacia = new Farmacia();

async function mainMenu() {
    while (true) {
        console.log("\nMenu:");
        console.log("1. Listar Medicamentos");
        console.log("2. Listar Clientes");
        console.log("3. Listar Vendas");
        console.log("4. Listar Estoque");
        console.log("5. Cadastrar Medicamento");
        console.log("6. Cadastrar Cliente");
        console.log("7. Realizar Venda");
        console.log("8. Substituir Medicamento");
        console.log("9. Deletar Cliente");
        console.log("10. Deletar Medicamento");
        console.log("11. Sair");

        const escolha = leitor.questionInt("Escolha uma opção: ");

        switch (escolha) {
            case 1:
                await farmacia.getMedicamentos();
                break;

            case 2:
                await farmacia.getClientes();
                break;

            case 3:
                await farmacia.getVendas();
                break;

            case 4:
                await farmacia.getEstoque();
                break;

            case 5:
                await farmacia.setMedicamentos();
                break;

            case 6:
                await farmacia.setClientes();
                break;

            case 7:
                await farmacia.setVendas();
                break;

            case 8:
                await farmacia.substituicao();
                break;

            case 9:
                await farmacia.deleteCliente();
                break;

            case 10:
                await farmacia.deleteMedicamento();
                break;

            case 11:
                console.log("Saindo do programa.");
                process.exit(0);
                break;

            default:
                console.log("Opção inválida. Por favor, escolha uma opção válida.");
        }
    }
}

mainMenu();

  