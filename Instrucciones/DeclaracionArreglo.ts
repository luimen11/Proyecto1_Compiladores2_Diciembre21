import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

export class DeclaracionArreglo implements Instruccion{
    linea: number;
    columna: number;
    public expresiones:Array<Expresion>;
    public identificador: string;
    public tipo:Tipo;

    constructor(identificador:string, tipo:Tipo, linea:number, columna:number,exp:Array<Expresion>){
        this.identificador = identificador;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.expresiones = exp;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        
            if(!ent.existeEnActual(this.identificador)){

                var valor:Array<any>= new Array<any>();
                this.expresiones.forEach((exp)=>{
                    valor.push(exp.getValorImplicito(ent,arbol));
                });
        
                const simbolo:Simbolo = new Simbolo(Tipo.ARRAY,this.identificador, this.linea,this.columna,valor);
                ent.agregar(this.identificador, simbolo);
            
            } else {
                console.error("id repetido", this.linea , "columna" , this.columna);  
            }
        
        
    }


}