"use strict";
exports.__esModule = true;
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(tipo, descripcion, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    return Error;
}());
exports.Error = Error;
