"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Garagem = void 0;
var leitor = require("readline-sync");
var Carro = /** @class */ (function () {
    function Carro(marca, modelo, ano, placa) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
    }
    return Carro;
}());
var Garagem = /** @class */ (function () {
    function Garagem() {
        this.carros = [];
    }
    Garagem.prototype.addCarro = function () {
        var marca = leitor.question("Informe a marca do seu carro: ");
        var modelo = leitor.question("Informe o modelo do seu carro: ");
        var ano = leitor.question("Informe o ano do seu carro: ");
        var placa = leitor.question("Informe a placa do seu carro: ");
        var carro = new Carro(marca, modelo, ano, placa);
        this.carros.push(carro);
        console.log("".concat(carro.toString(), " foi adicionado \u00E0 garagem"));
    };
    Garagem.prototype.removerCarro = function () {
        var placa = leitor.question("Informe a placa do carro a ser removido: ");
        var index = this.carros.indexOf(placa);
        this.carros.splice(index, 1);
        console.log("Carro com a placa: ".concat(placa, " foi removido da garagem"));
    };
    Garagem.prototype.getGaragem = function () {
        console.log("Carros na garagem: ", this.carros);
    };
    return Garagem;
}());
exports.Garagem = Garagem;
