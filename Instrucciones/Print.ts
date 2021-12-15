import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";

// print("hola mundo");

export class Print implements Instruccion{
    linea: number;
    columna: number;
    public expresion:Expresion;
    salto: boolean;

    // meter listado de print print(a,b)
    constructor(exp:Expresion, linea:number, columna:number,saltoLinea:boolean=false){
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = saltoLinea;
    }

    traducir(ent: Entorno, arbol: AST) {
        throw new Error("Method not implemented.");
    }

    ejecutar(ent: Entorno, arbol: AST) {
        const valor = this.expresion.getValorImplicito(ent, arbol);
        let actual:String;                
        var inputValue = (<HTMLInputElement>document.getElementById("txtSalida")).value;
        //actual = document.getElementById("txtSalida").value;
        if(valor!==null){
            if(!this.salto){
               //process.stdout.write('> ${valor}');
               (<HTMLInputElement>document.getElementById("txtSalida")).value = inputValue + '\n' + valor;
               console.log('>', valor)
            }
            else
            (<HTMLInputElement>document.getElementById("txtSalida")).value = inputValue + ' ' + valor;
            
        }else{
            (<HTMLInputElement>document.getElementById("txtSalida")).value = "Error, no se pueden imprimir valores nulos";
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }

}