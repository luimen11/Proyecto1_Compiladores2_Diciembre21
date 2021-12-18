import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class Funcion implements Instruccion{
    linea: number;
    columna: number;
    public id:string;
    public tipo:Tipo;
    public lista_parametros: Array<Simbolo>;
    public lista_instrucciones: Array<Instruccion>;
    
    constructor(tipo:Tipo,id:string,lista_parametros: Array<Simbolo>,lista_instrucciones:Array<Instruccion>, linea:number, columna:number ){
        this.tipo = tipo;
        this.id = id;
        this.lista_parametros = lista_parametros;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
        const entornoFuncion = new Entorno(ent);

        this.lista_instrucciones.forEach((instruccion) => {
            instruccion.ejecutar(entornoFuncion, arbol);    
        });
   
    }



}