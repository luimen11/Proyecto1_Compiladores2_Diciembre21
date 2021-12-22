import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";

export class AccesoArreglo implements Expresion {
    linea: number;
    columna: number;
    identificador: any;
    expresion: Expresion;

    constructor(identificador:any,exp:Expresion, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
        this.expresion = exp;
    }
    
    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        if(ent.existe(this.identificador)){
            const simbolo:Simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        } else {
            console.error("error semantico no existe la variable", this.linea , "columna" , this.columna);  
        }
        return Tipo.NULL;
    }

    getValorImplicito(ent: Entorno, arbol: AST) {
        if(ent.existe(this.identificador)){
            const simbolo:Simbolo = ent.getSimbolo(this.identificador);
            const numero = this.expresion.getValorImplicito(ent,arbol);

            return simbolo.valor[numero];
            
        } else {
            console.error("error semantico no existe la variable", this.linea , "columna" , this.columna);  
        }
    }

   
    
}