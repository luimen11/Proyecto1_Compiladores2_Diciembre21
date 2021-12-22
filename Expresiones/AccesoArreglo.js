"use strict";
exports.__esModule = true;
exports.AccesoArreglo = void 0;
var AccesoArreglo = /** @class */ (function () {
    function AccesoArreglo(identificador, exp, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.expresion = exp;
    }
    AccesoArreglo.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    AccesoArreglo.prototype.getTipo = function (ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            console.error("error semantico no existe la variable", this.linea, "columna", this.columna);
        }
        return Tipo.NULL;
    };
    AccesoArreglo.prototype.getValorImplicito = function (ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            var numero = this.expresion.getValorImplicito(ent, arbol);
            return simbolo.valor[numero];
        }
        else {
            console.error("error semantico no existe la variable", this.linea, "columna", this.columna);
        }
    };
    return AccesoArreglo;
}());
exports.AccesoArreglo = AccesoArreglo;
