import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class Asignacion implements Instruccion{
    linea: number;
    columna: number;
    public expresion:Expresion;
    public identificador: string;
    

    // meter listado de print print(a,b)
    constructor(identificador:string, exp:Expresion, linea:number, columna:number ){
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
            if(ent.existe(this.identificador)){
                const simbolo:Simbolo = ent.getSimbolo(this.identificador);
                let condicion1 = simbolo.getTipo(ent, arbol);
                let condicion2 = this.expresion.getTipo(ent,arbol);
                if(condicion1 === condicion2 || (condicion1 == 1 && condicion2 == 2) || (condicion1 == 2 && condicion2 == 1)){
                    const valor = this.expresion.getValorImplicito(ent,arbol);
                    simbolo.valor  = valor;
                    ent.reemplazar(this.identificador, simbolo);
            }   else {
                console.error("error semantico, no valor de tipo difente al declarado");           
                }
            } else {
                console.error("error semantico no existe variable", this.linea , "columna" , this.columna);  
            }
        
    }

   

}