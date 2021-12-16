"use strict";
exports.__esModule = true;
exports.While = void 0;
var While = /** @class */ (function () {
    function While(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    While.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    While.prototype.ejecutar = function (ent, arbol) {
        var entornoWhile = new Entorno(ent);
        //verificar que la exp sea booleana
        while (this.condicion.getValorImplicito(ent, arbol)) {
            this.lista_instrucciones.forEach(function (instruccion) {
                instruccion.ejecutar(entornoWhile, arbol);
            });
        }
    };
    return While;
}());
exports.While = While;
