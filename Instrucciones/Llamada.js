"use strict";
exports.__esModule = true;
exports.Llamada = void 0;
var Llamada = /** @class */ (function () {
    function Llamada(id, lista_parametros, linea, columna) {
        this.id = id;
        this.lista_parametros = lista_parametros;
        this.linea = linea;
        this.columna = columna;
    }
    Llamada.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Llamada.prototype.ejecutar = function (ent, arbol) {
        var entornoFuncion = new Entorno(ent);
        var numeroFuncion = arbol.retonarFuncion(this.id);
        if (numeroFuncion == null) {
            console.log("no existe la funcion");
        }
        else {
            arbol.funciones[numeroFuncion].parametros_pasados = this.lista_parametros;
            return arbol.funciones[numeroFuncion].ejecutar(entornoFuncion, arbol);
        }
    };
    Llamada.prototype.getValorImplicito = function (ent, arbol) {
        return this.ejecutar(ent, arbol);
    };
    return Llamada;
}());
exports.Llamada = Llamada;
