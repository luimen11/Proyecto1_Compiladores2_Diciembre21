"use strict";
exports.__esModule = true;
exports.Switch = void 0;
// print("hola mundo");
var Switch = /** @class */ (function () {
    // meter listado de print print(a,b)
    function Switch(condicion, lista_cases, linea, columna) {
        this.condicion = condicion;
        this.lista_cases = lista_cases;
        this.linea = linea;
        this.columna = columna;
    }
    Switch.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Switch.prototype.ejecutar = function (ent, arbol) {
        var condi = this.condicion.getValorImplicito(ent, arbol);
        this.lista_cases.forEach(function (caso) {
            if (caso.Default) {
                var entornoDefault_1 = new Entorno(ent);
                caso.instrucciones.forEach(function (instruccion) {
                    instruccion.ejecutar(entornoDefault_1, arbol);
                });
                return;
            }
            else {
                if (condi == caso.condicion.getValorImplicito(ent, arbol)) {
                    var entornoDefault_2 = new Entorno(ent);
                    caso.instrucciones.forEach(function (instruccion) {
                        instruccion.ejecutar(entornoDefault_2, arbol);
                    });
                }
            }
        });
    };
    return Switch;
}());
exports.Switch = Switch;
