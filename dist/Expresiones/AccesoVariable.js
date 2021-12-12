"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoVariable = void 0;
const Tipo_1 = require("../AST/Tipo");
class AccesoVariable {
    constructor(identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    getTipo(ent, arbol) {
        if (ent.existe(this.identificador)) {
            const simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            console.error("error semantico no existe la variable", this.linea, "columna", this.columna);
        }
        return Tipo_1.Tipo.NULL;
    }
    getValorImplicito(ent, arbol) {
        if (ent.existe(this.identificador)) {
            const simbolo = ent.getSimbolo(this.identificador);
            return simbolo.valor;
        }
        else {
            console.error("error semantico no existe la variable", this.linea, "columna", this.columna);
        }
    }
}
exports.AccesoVariable = AccesoVariable;
