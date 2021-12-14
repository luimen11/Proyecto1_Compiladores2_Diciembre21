"use strict";
exports.__esModule = true;
exports.ReporteErrores = void 0;
var ReporteErrores = /** @class */ (function () {
    function ReporteErrores() {
        this.errores = [];
    }
    ReporteErrores.getInstance = function () {
        if (!ReporteErrores.instance) {
            ReporteErrores.instance = new ReporteErrores();
        }
        return ReporteErrores.instance;
    };
    ReporteErrores.prototype.getErrores = function () {
        return this.errores;
    };
    ReporteErrores.prototype.pushError = function (error) {
        this.errores.push(error);
    };
    return ReporteErrores;
}());
exports.ReporteErrores = ReporteErrores;
