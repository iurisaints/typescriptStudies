"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendedor = exports.Funcionario = void 0;
var Funcionario = /** @class */ (function () {
    function Funcionario(nome, idade, salario) {
        this.idade = idade;
        this.nome = nome;
        this.salario = salario;
    }
    Funcionario.prototype.exibirDetalhes = function () {
        console.log("Nome: ".concat(this.nome));
        console.log("Idade: ".concat(this.idade));
        console.log("Salario: ".concat(this.salario));
    };
    return Funcionario;
}());
exports.Funcionario = Funcionario;
var Vendedor = /** @class */ (function (_super) {
    __extends(Vendedor, _super);
    function Vendedor(nome, idade, salario, comissao) {
        var _this = _super.call(this, nome, idade, salario) || this;
        _this.comissao = comissao;
        return _this;
    }
    Vendedor.prototype.calcularSalario = function () {
        this.salario += this.comissao;
    };
    Vendedor.prototype.exibirDetalhes = function () {
        _super.prototype.exibirDetalhes.call(this);
        console.log("Comiss\u00E3o: ".concat(this.comissao));
    };
    return Vendedor;
}(Funcionario));
exports.Vendedor = Vendedor;
