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
            var entornoIf_1 = new Entorno(ent);
            this.lista_instrucciones_if.forEach(function (instruccion) {
                instruccion.ejecutar(entornoIf_1, arbol);
            });
            return;
        }
        else {
            if (this.lista_else_if.length > 0) {
                var entornoElseIf = new Entorno(ent);
                this.lista_else_if[0].ejecutar(entornoElseIf, arbol);
            }
            if (this.lista_instrucciones_else.length > 0) {
                var entornoElse_1 = new Entorno(ent);
                this.lista_instrucciones_else.forEach(function (instruccion) {
                    instruccion.ejecutar(entornoElse_1, arbol);
                });
            }
        }
        return;
    };
    return If;
}());
exports.If = If;
