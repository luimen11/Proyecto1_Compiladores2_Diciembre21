import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class Llamada implements Instruccion{
    linea: number;
    columna: number;
    public id:string;
    public lista_parametros: Array<Expresion>;
    
    constructor(id:string,lista_parametros: Array<Expresion>, linea:number, columna:number ){
        this.id = id;
        this.lista_parametros = lista_parametros;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
        const entornoFuncion = new Entorno(ent);

        var numeroFuncion = arbol.retonarFuncion(this.id);
        if(numeroFuncion == null){
            console.log("no existe la funcion");
        }else {
            arbol.funciones[numeroFuncion].parametros_pasados = this.lista_parametros;
            return arbol.funciones[numeroFuncion].ejecutar(entornoFuncion,arbol);
        }           
   
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        return this.ejecutar(ent, arbol);
    }



}