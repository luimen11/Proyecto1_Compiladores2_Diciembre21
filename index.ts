import { AST } from "./AST/AST";
import { Entorno } from "./AST/Entorno";
import { Instruccion } from "./Interfaces/Instruccion";

const gramatica = require('./Gramatica/gramatica');

function ejecutarCodigo(entrada:string){
    console.log("entre aqui");
    //traigo todas las raices
    const ast = gramatica.parse(entrada);
    //const ast:AST = new AST(instrucciones);
    const entornoGlobal:Entorno = new Entorno(null);
    //recorro todas las raices  RECURSIVA
    ast.forEach((element:Instruccion) => {
        element.ejecutar(entornoGlobal,ast);
    })
}

