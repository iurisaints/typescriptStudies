import { Garagem } from "./Garagem";
import * as leitor from "readline-sync"
let menu = true
let garagem = new Garagem()
while(menu){
    let opt = leitor.questionInt("1 - Visualizar carros \n2 - Adicionar carros à garagem \n3 - Remover carros \n4 - Sair \n:")
    switch(opt){
        case 1:
            garagem.getGaragem()
            break
        case 2:
            garagem.addCarro()
            break
        case 3:
            garagem.removerCarro()
            break
        case 4:
            console.log("Saindo...");
            menu = false
            break
    }
}