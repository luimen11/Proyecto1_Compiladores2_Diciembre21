import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class AsignacionArreglo implements Instruccion{
    linea: number;
    columna: number;
    public indice:Expresion;
    public expresion:Expresion;
    public identificador: string;
    
    constructor(identificador:string, indice:Expresion, exp:Expresion, linea:number, columna:number ){
        this.identificador = identificador;
        this.indice = indice;
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
            if(ent.existe(this.identificador)){
                const simbolo:Simbolo = ent.getSimbolo(this.identificador);
                const numero = this.indice.getValorImplicito(ent,arbol);

                const valor = this.expresion.getValorImplicito(ent,arbol);
                            
                simbolo.valor[numero]  = valor;
                ent.reemplazar(this.identificador, simbolo);

                
            } else {
                console.error("error semantico no existe variable", this.linea , "columna" , this.columna);  
            }
        
    }

   

}