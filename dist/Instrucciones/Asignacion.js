"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
// print("hola mundo");
class Asignacion {
    // meter listado de print print(a,b)
    constructor(identificador, exp, linea, columna) {
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        if (ent.existe(this.identificador)) {
            const simbolo = ent.getSimbolo(this.identificador);
            if (simbolo.getTipo(ent, arbol) === this.expresion.getTipo(ent, arbol)) {
                const valor = this.expresion.getValorImplicito(ent, arbol);
                simbolo.valor = valor;
                ent.reemplazar(this.identificador, simbolo);
            }
            else {
                console.error("error semantico, no valor de tipo difente al declarado");
            }
        }
        else {
            console.error("error semantico no existe variable", this.linea, "columna", this.columna);
        }
    }
}
exports.Asignacion = Asignacion;
