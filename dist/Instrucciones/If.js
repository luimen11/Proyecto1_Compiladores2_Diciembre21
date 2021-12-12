"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Entorno_1 = require("../AST/Entorno");
// print("hola mundo");
class If {
    // meter listado de print print(a,b)
    constructor(condicion, lista_instrucciones_if, lista_instrucciones_else, lista_else_if, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones_if = lista_instrucciones_if;
        this.lista_instrucciones_else = lista_instrucciones_else;
        this.lista_else_if = lista_else_if;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        //verificar que la exp sea booleana
        if (this.condicion.getValorImplicito(ent, arbol)) {
            const entornoIf = new Entorno_1.Entorno(ent);
            this.lista_instrucciones_if.forEach((instruccion) => {
                instruccion.ejecutar(entornoIf, arbol);
            });
        }
        else {
            this.lista_instrucciones_if.forEach((elseif) => {
                if (elseif.condicion.getValorImplicito(ent, arbol)) {
                    const entornoIf = new Entorno_1.Entorno(ent);
                    elseif.lista_instrucciones_if.forEach((instruccion) => {
                        instruccion.ejecutar(entornoIf, arbol);
                    });
                    return;
                }
            });
            if (this.lista_instrucciones_else.length > 0) {
                const entornoElse = new Entorno_1.Entorno(ent);
                this.lista_instrucciones_else.forEach((instruccion) => {
                    instruccion.ejecutar(entornoElse, arbol);
                });
            }
        }
    }
}
exports.If = If;
