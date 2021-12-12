"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Simbolo_1 = require("../AST/Simbolo");
const Tipo_1 = require("../AST/Tipo");
// print("hola mundo");
class Declaracion {
    // meter listado de print print(a,b)
    constructor(identificadores, tipo, linea, columna, exp = null) {
        this.identificadores = identificadores;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        this.identificadores.forEach((id) => {
            if (!ent.existe(id)) {
                if (this.expresion !== null) {
                    if (this.tipo === this.expresion.getTipo(ent, arbol)) {
                        const valor = this.expresion.getValorImplicito(ent, arbol);
                        const simbolo = new Simbolo_1.Simbolo(this.tipo, id, this.linea, this.columna, valor);
                        ent.agregar(id, simbolo);
                    }
                    else {
                        console.error("valor de tipo difente al declarado");
                    }
                }
                else {
                    const simbolo = new Simbolo_1.Simbolo(this.tipo, id, this.linea, this.columna, this.getValorDefault());
                    ent.agregar(id, simbolo);
                }
            }
            else {
                console.error("error semantico", this.linea, "columna", this.columna);
            }
        });
    }
    getValorDefault() {
        if (this.tipo === Tipo_1.Tipo.INT)
            return 0;
        else if (this.tipo === Tipo_1.Tipo.DOUBLE)
            return 0.0;
        else if (this.tipo === Tipo_1.Tipo.BOOL)
            return false;
        else if (this.tipo === Tipo_1.Tipo.STRING)
            return "";
        else
            return null;
    }
}
exports.Declaracion = Declaracion;
