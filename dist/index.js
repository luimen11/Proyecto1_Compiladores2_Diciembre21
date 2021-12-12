"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = require("./AST/Entorno");
const gramatica = require('./Gramatica/gramatica');
function ejecutarCodigo(entrada) {
    //traigo todas las raices
    const ast = gramatica.parse(entrada);
    //const ast:AST = new AST(instrucciones);
    const entornoGlobal = new Entorno_1.Entorno(null);
    //recorro todas las raices  RECURSIVA
    ast.forEach((element) => {
        element.ejecutar(entornoGlobal, ast);
    });
}
