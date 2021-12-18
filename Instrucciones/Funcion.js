"use strict";
exports.__esModule = true;
exports.Funcion = void 0;
var Funcion = /** @class */ (function () {
    function Funcion(tipo, id, lista_parametros, lista_instrucciones, linea, columna) {
        this.tipo = tipo;
        this.id = id;
        this.lista_parametros = lista_parametros;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    Funcion.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Funcion.prototype.ejecutar = function (ent, arbol) {
        var entornoFuncion = new Entorno(ent);
        this.lista_instrucciones.forEach(function (instruccion) {
            instruccion.ejecutar(entornoFuncion, arbol);
        });
    };
    return Funcion;
}());
exports.Funcion = Funcion;
