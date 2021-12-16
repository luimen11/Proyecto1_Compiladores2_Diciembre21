import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class If implements Instruccion{
    linea: number;
    columna: number;
    public condicion:Expresion;
    public lista_instrucciones_if: Array<Instruccion>;
    public lista_instrucciones_else: Array<Instruccion>;
    public lista_else_if: Array<If>;

    // meter listado de print print(a,b)
    constructor(condicion:Expresion,lista_instrucciones_if:Array<Instruccion>, lista_instrucciones_else:Array<Instruccion>,lista_else_if:Array<If>, linea:number, columna:number ){
        this.condicion = condicion;
        this.lista_instrucciones_if = lista_instrucciones_if;
        this.lista_instrucciones_else = lista_instrucciones_else;
        this.lista_else_if = lista_else_if;
        this.linea = linea;
        this.columna = columna;
       
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        //verificar que la exp sea booleana
        if(this.condicion.getValorImplicito(ent,arbol)){
            console.log(this.lista_instrucciones_if.length)
            const entornoIf = new Entorno(ent);
            this.lista_instrucciones_if.forEach((instruccion) => {
                instruccion.ejecutar(entornoIf, arbol);
            })
            return;

        } else {
            
            if(this.lista_else_if.length > 0){
                const entornoElseIf = new Entorno(ent);
                this.lista_else_if[0].ejecutar(entornoElseIf, arbol)
            }
   
            if(this.lista_instrucciones_else.length > 0){
            const entornoElse = new Entorno(ent);
                this.lista_instrucciones_else.forEach((instruccion:any) => {
                instruccion.ejecutar(entornoElse, arbol);
             })
            }
        }
        return;
        
    }

   

}