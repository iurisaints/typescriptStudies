import { SistemaDeAnimais } from "./Classes";
import * as leitor from "readline-sync"

let petshop = new SistemaDeAnimais();

while(true){
        console.log(`1 - Cadastrar animais 🐵`);
        console.log(`2 - Remover animais 🐱‍👤`);
        console.log(`3 - Listar animais 📟`);
        console.log(`4 - Fazer os animais interagirem 🐱🐶`);
        console.log(`0 - Sair ❌`);
        
        let opt = leitor.questionInt(`Informe a opção: `)
        switch(opt){
            case 1:
                petshop.cadastrarAnimal()
                break;
            case 2:
                petshop.removerAnimais()
                break;
            case 3:
                petshop.listarAnimais()
                break;
            case 4:
                petshop.interagirAnimais()
                break;
            case 0:
                console.log(`Saindo!`);
                process.exit(0);
        }
}