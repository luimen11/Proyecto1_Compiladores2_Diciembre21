import { AST } from "../AST/AST";
import { Entorno } from "../AST/Entorno";
import { Tipo } from "../AST/Tipo";
import { Expresion } from "../Interfaces/Expresion";
import { Error } from "../Error";
import { ReporteErrores } from "../ReporteErrores";

export enum Operador {
    CONCATENACION,
    REPETICION,
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    MENOS_UNARIO,
    MAYOR_QUE,
    MENOR_QUE,
    IGUAL_IGUAL,
    DIFERENTE_QUE,
    OR,
    AND,
    NOT,
    MAYOR_IGUA_QUE,
    MENOR_IGUA_QUE,
    DESCONOCIDO
}

export class Operacion implements Expresion {
    linea: number;
    columna: number;
    op_izquierda: Expresion;
    op_derecha: Expresion;
    operador: Operador;

    constructor(op_izquierda:Expresion,op_derecha:Expresion, operacion:Operador, linea:number, columna:number){
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    traducir(ent: Entorno, arbol: AST) {
        //throw new Error("Method not implemented.");
    }

    getTipo(ent: Entorno, arbol: AST): Tipo {
        const valor = this.getValorImplicito(ent, arbol);
        if (typeof(valor) === 'boolean')
        {
            return Tipo.BOOL;
        }
        else if (typeof(valor) === 'string')
        {
            return Tipo.STRING;
        }
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return Tipo.INT;
            }
           return Tipo.DOUBLE;
        }
        else if(valor === null){
            return Tipo.NULL;
        }
            
        return Tipo.VOID;
    }

    //Metodo que solo se utiliza para determinar los tipos especficios de datos permitidos
    getTipoDato(valor: any){
        if (typeof(valor) === 'boolean')        
            return "boolean";
        else if (typeof(valor) === 'number')
        {
            if(this.isInt(Number(valor))){
                return "int";
            }
            return "double";
        }
        else if (typeof(valor) === 'string')
        {
            if(valor.length == 1){
                return "char";
            }
            else
                return "string";
        }
        else if(valor === null)
        {
            return "null";
        }
    }
    

    getValorImplicito(ent: Entorno, arbol: AST) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT){
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            let op2 = this.op_derecha.getValorImplicito(ent, arbol);
            
            // concatenacion
            if (this.operador == Operador.CONCATENACION)
            {
                if (typeof(op1==="string") && typeof(op2==="string"))
                {
                    return op1 + op2;
                }
                else
                {                    
                    console.log("Error de tipos de datos no permitidos realizando una concatenacion");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una concatenacion",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // repeticion
            if (this.operador == Operador.REPETICION)
            {
                if (typeof(op1==="string") && typeof(op2==="number"))
                {
                    if(this.isInt(Number(op2))){
                        
                        let repetir:number= 0;
                        let textoRepetir:string = "";
                        while (repetir < op2) {
                            textoRepetir += op1;    
                            repetir++;
                        }
                        return textoRepetir;
                        
                    } else {                        
                        console.log("Error de tipos de datos no permitidos realizando una repeticion");
                        var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una repeticion",1,1);
                        const re = ReporteErrores.getInstance();
                        re.pushError(prueba);
                        
                    }

                   
                }
                else
                {                    
                    console.log("Error de tipos de datos no permitidos realizando una repeticion");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una repeticion",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            //suma
            if (this.operador == Operador.SUMA)
            {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 + op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 + op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 + parseInt(op2);
                }    
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 + op2;
                }     
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 + op2;
                }   
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 + parseInt(op2);
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int"))
                {                                       
                    return parseInt(op1) + op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double"))
                {                                       
                    return parseInt(op1) + op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return parseInt(op1) + parseInt(op2)
                }                                                                              
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una suma",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);

                    return null;
                }
            }

            //resta
            else if (this.operador == Operador.RESTA)
            {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 - op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 - op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 - parseInt(op2);
                }    
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 - op2;
                }     
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 - op2;
                }   
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 - parseInt(op2);
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int"))
                {                                       
                    return parseInt(op1) - op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double"))
                {                                       
                    return parseInt(op1) - op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return parseInt(op1) - parseInt(op2)
                }                                                                              
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una resta");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una resta",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);

                    return null;
                }
            }

            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION)
            {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 * op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 * op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 * parseInt(op2);
                }    
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 * op2;
                }     
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 * op2;
                }   
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 * parseInt(op2);
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int"))
                {                                       
                    return parseInt(op1) * op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double"))
                {                                       
                    return parseInt(op1) * op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return parseInt(op1) * parseInt(op2)
                }                                                                              
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una multiplicacion.");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una multiplicacion",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);

                    return null;
                }
            }

            //division
            else if (this.operador == Operador.DIVISION)
            {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 / op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 / op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 / parseInt(op2);
                }    
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 / op2;
                }     
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 / op2;
                }   
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 / parseInt(op2);
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int"))
                {                                       
                    return parseInt(op1) / op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double"))
                {                                       
                    return parseInt(op1) / op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return parseInt(op1) / parseInt(op2)
                }                                                                              
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una division.");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una division",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);

                    return null;
                }
            }

            //modulo
            else if (this.operador == Operador.MODULO)
            {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 % op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 % op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 % parseInt(op2);
                }    
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int"))
                {                                       
                    return op1 % op2;
                }     
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double"))
                {                                       
                    return op1 % op2;
                }   
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return op1 % parseInt(op2);
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int"))
                {                                       
                    return parseInt(op1) % op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double"))
                {                                       
                    return parseInt(op1) % op2
                } 
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2)))
                {                                       
                    return parseInt(op1) % parseInt(op2)
                }                                                                              
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una modulo.");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una modulo",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);

                    return null;
                }
            }

            // mayor
            else if (this.operador == Operador.MAYOR_QUE)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 > op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional >");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional >",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // mayor o igual 
            else if (this.operador == Operador.MAYOR_IGUA_QUE)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 >= op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional >=");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional >=",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            
            // menor
            else if (this.operador == Operador.MENOR_QUE)
            {
                if (typeof(op1==="number") && typeof(op2==="number"))
                {
                    return op1 < op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional <");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional <",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
           // menor o igual
           else if (this.operador == Operador.MENOR_IGUA_QUE)
           {
               if (typeof(op1==="number") && typeof(op2==="number"))
               {
                   return op1 <= op2;
               }
               else
               {
                console.log("Error de tipos de datos no permitidos para la expresion relacional <=");
                var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional <=",1,1);
                const re = ReporteErrores.getInstance();
                re.pushError(prueba);
                   return null;
               }
           }
           // igual igual
           else if (this.operador == Operador.IGUAL_IGUAL)
           {
               if (typeof(op1==="number") && typeof(op2==="number"))
               {
                   return op1 == op2;
               }
               else
               {
                console.log("Error de tipos de datos no permitidos para la expresion relacional ==");
                var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional ==",1,1);
                const re = ReporteErrores.getInstance();
                re.pushError(prueba);
                   return null;
               }
           }

           // diferente
           else if (this.operador == Operador.DIFERENTE_QUE)
           {
               if (typeof(op1==="number") && typeof(op2==="number"))
               {
                   return op1 != op2;
               }
               else
               {
                console.log("Error de tipos de datos no permitidos para la expresion relacional !=");
                var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional !=",1,1);
                const re = ReporteErrores.getInstance();
                re.pushError(prueba);
                   return null;
               }
           }

            // AND
            else if (this.operador == Operador.AND)
            {
                if (typeof(op1==="boolean") && typeof(op2==="boolean"))
                {
                    return op1 && op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando un AND");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando un AND",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);                    
                    return null;
                }
            }
            // OR
            else if (this.operador == Operador.OR)
            {
                if (typeof(op1==="boolean") && typeof(op2==="boolean"))
                {
                    return op1 || op2;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando un OR");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando un OR",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);                    
                    return null;
                }
            }

            

        }else{
            let op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO)
            {
                if (typeof(op1==="number"))
                {
                    return -1* op1;
                }
                else
                {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una operación unaria",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);                    
                    return null;
                }
            }

            // not
            else if (this.operador == Operador.NOT)
            {
                if (typeof(op1==="boolean"))
                {
                    return !op1 ;
                }
                else
                {                    
                    console.log("Error de tipos de datos no permitidos realizando un not");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando un not",1,1);
                    const re = ReporteErrores.getInstance();
                    re.pushError(prueba);                    
                    return null;
                }
            }
        }
        return null;
    }

    isInt(n:number){
        return Number(n) === n && n % 1 === 0;
    }
}