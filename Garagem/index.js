"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Garagem_1 = require("./Garagem");
var leitor = require("readline-sync");
var menu = true;
var garagem = new Garagem_1.Garagem();
while (menu) {
    var opt = leitor.questionInt("1 - Visualizar carros \n2 - Adicionar carros à garagem \n3 - Remover carros \n4 - Sair \n:");
    switch (opt) {
        case 1:
            garagem.getGaragem();
            break;
        case 2:
            garagem.addCarro();
            break;
        case 3:
            garagem.removerCarro();
            break;
        case 4:
            console.log("Saindo...");
            menu = false;
            break;
    }
}
