"use strict";
exports.__esModule = true;
exports.If = void 0;
// print("hola mundo");
var If = /** @class */ (function () {
    // meter listado de print print(a,b)
    function If(condicion, lista_instrucciones_if, lista_instrucciones_else, lista_else_if, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones_if = lista_instrucciones_if;
        this.lista_instrucciones_else = lista_instrucciones_else;
        this.lista_else_if = lista_else_if;
        this.linea = linea;
        this.columna = columna;
    }
    If.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    If.prototype.ejecutar = function (ent, arbol) {
        //verificar que la exp sea booleana
        if (this.condicion.getValorImplicito(ent, arbol)) {
            console.log(this.lista_instrucciones_if.length);
            var entornoIf = new Entorno(ent);
            for (var i = 0; i < this.lista_instrucciones_if.length; i++) {
                var valor = this.lista_instrucciones_if[i].ejecutar(entornoIf, arbol);
                if (this.lista_instrucciones_if[i].constructor.name.toString() == "Return") {
                    return valor;
                }
                if (valor != null) {
                    console.log("viene un return", valor);
                    return valor;
                }
            }
        }
        else {
            if (this.lista_else_if.length > 0) {
                var entornoElseIf = new Entorno(ent);
                this.lista_else_if[0].ejecutar(entornoElseIf, arbol);
            }
            if (this.lista_instrucciones_else.length > 0) {
                var entornoElse = new Entorno(ent);
                for (var i = 0; i < this.lista_instrucciones_else.length; i++) {
                    var valor = this.lista_instrucciones_else[i].ejecutar(entornoElse, arbol);
                    if (this.lista_instrucciones_else[i].constructor.name.toString() == "Return") {
                        return valor;
                    }
                    if (valor != null) {
                        console.log("viene un return", valor);
                        return valor;
                    }
                }
                return null;
            }
        }
        return;
    };
    return If;
}());
exports.If = If;
