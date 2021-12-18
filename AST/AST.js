"use strict";
exports.__esModule = true;
exports.AST = void 0;
var AST = /** @class */ (function () {
    function AST(instrucciones, funciones) {
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = funciones;
    }
    AST.prototype.ejecutarMain = function () {
        for (var i = 0; i < this.funciones.length; i++) {
            if (this.funciones[i].constructor.name.toString() == "Funcion") {
                if (this.funciones[i].id == "main") {
                    return i;
                }
            }
        }
        return null;
    };
    return AST;
}());
exports.AST = AST;
