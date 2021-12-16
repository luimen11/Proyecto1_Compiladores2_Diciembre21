import { hostname } from "os";
import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class While implements Instruccion{
    linea: number;
    columna: number;
    public condicion:Expresion;
    public lista_instrucciones: Array<Instruccion>;
    
    constructor(condicion:Expresion,lista_instrucciones:Array<Instruccion>, linea:number, columna:number ){
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
        const entornoWhile = new Entorno(ent);
        //verificar que la exp sea booleana
        
        while(this.condicion.getValorImplicito(ent,arbol)){
            
            this.lista_instrucciones.forEach((instruccion) => {
                instruccion.ejecutar(entornoWhile, arbol);
                
            })
            
        } 
        
    }

   

}