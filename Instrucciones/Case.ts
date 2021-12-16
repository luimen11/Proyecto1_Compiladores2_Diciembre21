import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class Case implements Instruccion{
    linea: number;
    columna: number;
    public condicion:Expresion;
    public instrucciones: Array<Instruccion>;
    Default:boolean;

    // meter listado de print print(a,b)
    constructor(condicion:Expresion,instrucciones:Array<Instruccion>, linea:number, columna:number, Default:boolean=false ){
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.linea = linea;
        this.columna = columna;
        this.Default = Default;          
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
    
    }

   

}