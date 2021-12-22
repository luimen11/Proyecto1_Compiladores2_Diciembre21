"use strict";
exports.__esModule = true;
exports.AsignacionArreglo = void 0;
var AsignacionArreglo = /** @class */ (function () {
    function AsignacionArreglo(identificador, indice, exp, linea, columna) {
        this.identificador = identificador;
        this.indice = indice;
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    AsignacionArreglo.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    AsignacionArreglo.prototype.ejecutar = function (ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            var numero = this.indice.getValorImplicito(ent, arbol);
            var valor = this.expresion.getValorImplicito(ent, arbol);
            simbolo.valor[numero] = valor;
            ent.reemplazar(this.identificador, simbolo);
        }
        else {
            console.error("error semantico no existe variable", this.linea, "columna", this.columna);
        }
    };
    return AsignacionArreglo;
}());
exports.AsignacionArreglo = AsignacionArreglo;
