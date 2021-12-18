import { Funcion } from "../Instrucciones/Funcion";
import { Instruccion } from "../Interfaces/Instruccion";

export class AST{
    
    public instrucciones:Array<Instruccion>
    public structs: Array<any>
    public funciones: Array<Funcion>

    constructor(instrucciones:Array<Instruccion>,funciones:Array<Funcion>){
        this.instrucciones = instrucciones;
        this.structs = [];
        this.funciones = funciones;
    }

    ejecutarMain(): number{

        for (var i=0; i<this.funciones.length; i++){
        
            if(this.funciones[i].constructor.name.toString() == "Funcion"){
                if(this.funciones[i].id == "main"){
                    return i;
                }
            }
        }

        return null;
        
    }


}