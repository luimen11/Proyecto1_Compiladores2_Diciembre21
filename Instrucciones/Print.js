"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
// print("hola mundo");
class Print {
    // meter listado de print print(a,b)
    constructor(exp, linea, columna, saltoLinea) {
														  
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = saltoLinea;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {

        let cadena= "";
        this.expresion.forEach((instruccion) => {
            const valor = instruccion.getValorImplicito(ent, arbol);    
            cadena += valor + ' ';
        });

        let inputValue =salida.getValue();
        let actual;
        //actual = document.getElementById("txtSalida").value;
        if (cadena != null) {
            if (this.salto) {
                //process.stdout.write('> ${valor}');
                actual = inputValue + '\n' + cadena;
                salida.setValue(actual)
                console.log('>', cadena);
            }
            else{
                actual = inputValue + ' ' + cadena;
                salida.setValue(actual);
                console.log('>', cadena);
            }
        }
        else {
            document.getElementById("console").value = "Error, no se pueden imprimir valores nulos";
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
}
	 
exports.Print = Print;