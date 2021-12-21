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
        if (this.parametros_pasados == null) {
            console.log("sin parametros");
        }
        else {
            console.log(this.parametros_pasados.length);
            if (this.parametros_pasados.length == this.lista_parametros.length) {
                for (var i = 0; i < this.parametros_pasados.length; i++) {
                    var valor = this.parametros_pasados[i].getValorImplicito(ent, arbol);
                    this.lista_parametros[i].valor = valor;
                    entornoFuncion.agregar(this.lista_parametros[i].indentificador, this.lista_parametros[i]);
                }
            }
            else {
                console.log("el numero de parametros no coincide con el referenciado");
            }
        }
        this.lista_instrucciones.forEach(function (instruccion) {
            instruccion.ejecutar(entornoFuncion, arbol);
        });
    };
    return Funcion;
}());
exports.Funcion = Funcion;
