"use strict";
exports.__esModule = true;
exports.Asignacion = void 0;
// print("hola mundo");
var Asignacion = /** @class */ (function () {
    // meter listado de print print(a,b)
    function Asignacion(identificador, exp, linea, columna) {
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }
    Asignacion.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Asignacion.prototype.ejecutar = function (ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            //console.log("simbolo",simbolo.getTipo(ent, arbol), "expresion",this.expresion.getTipo(ent, arbol))
                let condicion1 = simbolo.getTipo(ent, arbol);
                let condicion2 = this.expresion.getTipo(ent,arbol);
                if(condicion1 === condicion2 || (condicion1 == 1 && condicion2 == 2) || (condicion1 == 2 && condicion2 == 1)){
                var valor = this.expresion.getValorImplicito(ent, arbol);
                simbolo.valor = valor;
                ent.reemplazar(this.identificador, simbolo);
            }
            else {
                console.error("error semantico, no valor de tipo difente al declarado",this.linea, "columna", this.columna);
            }
        }
        else {
            console.error("error semantico no existe variable", this.linea, "columna", this.columna);
        }
    };
    return Asignacion;
}());
exports.Asignacion = Asignacion;
