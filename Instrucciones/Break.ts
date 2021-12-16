import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaces/Instruccion";

export class Break implements Instruccion{
    linea: number;
    columna: number;
    
    constructor(linea:number, columna:number ){
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ent: Entorno, arbol: AST) {
        
    }

    ejecutar(ent: Entorno, arbol: AST) {
    
    }

}