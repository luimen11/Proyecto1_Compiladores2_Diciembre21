import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { Case } from "../Instrucciones/Case";
import { Break } from "./Break";

// print("hola mundo");

export class Switch implements Instruccion{
    linea: number;
    columna: number;
    public condicion:Expresion;
    public lista_cases: Array<Case>;

    // meter listado de print print(a,b)
    constructor(condicion:Expresion,lista_cases:Array<Case>, linea:number, columna:number ){
        this.condicion = condicion;
        this.lista_cases = lista_cases;    
        this.linea = linea;
        this.columna = columna;
       
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        let condi = this.condicion.getValorImplicito(ent,arbol);
        let vieneBreak = false;

        this.lista_cases.every((caso) =>{

            if(caso.Default){
                const entornoDefault = new Entorno(ent);
                
                caso.instrucciones.every(( instruccion) =>{
                    instruccion.ejecutar(entornoDefault, arbol);
                    
                    if (instruccion.constructor.name.toString() == "Break") {
                        vieneBreak = true;
                        return false;
                    }else{
                        return true;
                    }
                        
                });

                if (vieneBreak) {
                    return false;
                }else{
                    return true;
                }
                

            }else {

                if(condi == caso.condicion.getValorImplicito(ent,arbol)){
                    const entornoDefault = new Entorno(ent);
                
                    caso.instrucciones.every(( instruccion) =>{
                        instruccion.ejecutar(entornoDefault, arbol);

                        if (instruccion.constructor.name.toString() == "Break") {
                            vieneBreak = true;
                            return false;
                        }else{
                            return true;
                        }

                    });
                }

                if (vieneBreak) {
                    return false;
                }else{
                    return true;
                }

            }

        })
      
    }

   

}