"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
// print("hola mundo");
class Print {
    // meter listado de print print(a,b)
    constructor(exp, linea, columna, saltoLinea = false) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = saltoLinea;
    }
    traducir(ent, arbol) {
        throw new Error("Method not implemented.");
    }
    ejecutar(ent, arbol) {
        const valor = this.expresion.getValorImplicito(ent, arbol);        
        let inputValue =salida.getValue();
        let actual;
        //actual = document.getElementById("txtSalida").value;
        if (valor !== null) {
            if (!this.salto) {
                //process.stdout.write('> ${valor}');
                actual = inputValue + '\n' + valor;
                salida.setValue(actual)
                console.log('>', valor);
            }
            else{
                actual = inputValue + ' ' + valor;
                salida.setValue() = actual;
                console.log('>', valor);
            }
        }
        else {
            salida.setValue() = "Error, no se pueden imprimir valores nulos";
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    }
}
exports.Print = Print;