"use strict";
exports.__esModule = true;
exports.DeclaracionArreglo = void 0;
var DeclaracionArreglo = /** @class */ (function () {
    function DeclaracionArreglo(identificador, tipo, linea, columna, exp) {
        this.identificador = identificador;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.expresiones = exp;
    }
    DeclaracionArreglo.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    DeclaracionArreglo.prototype.ejecutar = function (ent, arbol) {
        if (!ent.existeEnActual(this.identificador)) {
            var valor = new Array();
            this.expresiones.forEach(function (exp) {
                valor.push(exp.getValorImplicito(ent, arbol));
            });
            var simbolo = new Simbolo(Tipo.ARRAY, this.identificador, this.linea, this.columna, valor);
            ent.agregar(this.identificador, simbolo);
        }
        else {
            console.error("id repetido", this.linea, "columna", this.columna);
        }
    };
    return DeclaracionArreglo;
}());
exports.DeclaracionArreglo = DeclaracionArreglo;
