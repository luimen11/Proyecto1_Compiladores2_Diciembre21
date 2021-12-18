"use strict";
exports.__esModule = true;
exports.Return = void 0;
var Return = /** @class */ (function () {
    function Return(expresion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }
    Return.prototype.traducir = function (ent, arbol) {
    };
    Return.prototype.ejecutar = function (ent, arbol) {
        if (this.expresion == null) {
            return null;
        }
        else {
            return this.expresion.getValorImplicito(ent, arbol);
        }
    };
    return Return;
}());
exports.Return = Return;
