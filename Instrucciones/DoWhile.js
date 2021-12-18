"use strict";
exports.__esModule = true;
exports.DoWhile = void 0;
var DoWhile = /** @class */ (function () {
    function DoWhile(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    DoWhile.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    DoWhile.prototype.ejecutar = function (ent, arbol) {
        var entornoWhile = new Entorno(ent);
        //verificar que la exp sea booleana
        while (this.condicion.getValorImplicito(ent, arbol)) {
            this.lista_instrucciones.forEach(function (instruccion) {
                instruccion.ejecutar(entornoWhile, arbol);
            });
        }
    };
    return DoWhile;
}());
exports.DoWhile = DoWhile;
