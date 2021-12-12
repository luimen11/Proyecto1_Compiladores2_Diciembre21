"use strict";
exports.__esModule = true;
function ejecutar(entrada) {
    //traigo todas las raices
    var ast = gramatica.parse(entrada);
    //const ast:AST = new AST(instrucciones);
    var entornoGlobal = new Entorno_1.Entorno(null);
    //recorro todas las raices  RECURSIVA
    ast.forEach(function (element) {
        element.ejecutar(entornoGlobal, ast);
    });
}
