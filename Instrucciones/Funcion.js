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
                    var valor_1 = this.parametros_pasados[i].getValorImplicito(ent, arbol);
                    this.lista_parametros[i].valor = valor_1;
                    entornoFuncion.agregar(this.lista_parametros[i].indentificador, this.lista_parametros[i]);
                }
            }
            else {
                console.log("el numero de parametros no coincide con el referenciado");
            }
        }
        for (var i = 0; i < this.lista_instrucciones.length; i++) {
            var valor = this.lista_instrucciones[i].ejecutar(entornoFuncion, arbol);
            if (this.lista_instrucciones[i].constructor.name.toString() == "Return") {
                return valor;
            }
            if (valor != null) {
                console.log("viene un return", valor);
                return valor;
            }
        }
    };
    return Funcion;
}());
exports.Funcion = Funcion;
