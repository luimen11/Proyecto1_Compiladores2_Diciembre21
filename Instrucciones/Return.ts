import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Instruccion } from "../Interfaces/Instruccion";
import { Expresion } from "../Interfaces/Expresion";

export class Return implements Instruccion{
    linea: number;
    columna: number;
    public expresion:Expresion;
    
    constructor(expresion:Expresion,linea:number, columna:number ){
        this.linea = linea;
        this.columna = columna;
        this.expresion = expresion;
    }

    traducir(ent: Entorno, arbol: AST) {
        
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
        if(this.expresion == null){
            return null;
        }else {
            return this.expresion.getValorImplicito(ent,arbol);            
        }

    }

}