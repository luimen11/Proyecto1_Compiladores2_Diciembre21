"use strict";
exports.__esModule = true;
exports.Case = void 0;
// print("hola mundo");
var Case = /** @class */ (function () {
    // meter listado de print print(a,b)
    function Case(condicion, instrucciones, linea, columna, Default) {
        if (Default === void 0) { Default = false; }
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
        this.Default = Default;
    }
    Case.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Case.prototype.ejecutar = function (ent, arbol) {
    };
    return Case;
}());
exports.Case = Case;
