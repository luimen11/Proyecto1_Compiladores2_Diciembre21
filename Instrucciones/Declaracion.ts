import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Simbolo } from "../AST/Simbolo";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class Declaracion implements Instruccion{
    linea: number;
    columna: number;
    public expresion:Expresion;
    public identificadores: Array<string>;
    public tipo:Tipo;

    // meter listado de print print(a,b)
    constructor(identificadores:Array<string>, tipo:Tipo, linea:number, columna:number,exp:any= null ){
        this.identificadores = identificadores;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        this.identificadores.forEach((id:string)=>{
            if(!ent.existe(id)){
                if(this.expresion !== null){
                    if(this.tipo === this.expresion.getTipo(ent,arbol)){
                            const valor = this.expresion.getValorImplicito(ent,arbol);
                            const simbolo:Simbolo = new Simbolo(this.tipo,id, this.linea,this.columna,valor);
                            ent.agregar(id, simbolo);
                    }else {
                        console.error("valor de tipo difente al declarado");           
                    }
                } else {
                    const simbolo:Simbolo = new Simbolo(this.tipo,id, this.linea,this.columna,this.getValorDefault());
                    ent.agregar(id, simbolo);
                }

            } else {
                console.error("error semantico", this.linea , "columna" , this.columna);  
            }
        });
        
    }

    private getValorDefault():any {
        if(this. tipo === Tipo.INT)
            return 0;
        else if(this. tipo === Tipo.DOUBLE)
            return 0.0;
        else if(this. tipo === Tipo.BOOL)
            return false;
        else if(this. tipo === Tipo.STRING)
            return "";
        else if(this. tipo === Tipo.CHAR)
            return "";
        else 
            return null;
    }

}