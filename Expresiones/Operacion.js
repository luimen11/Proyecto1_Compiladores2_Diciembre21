"use strict";
exports.__esModule = true;
exports.Operacion = exports.Operador = void 0;
var Operador;
(function (Operador) {
    Operador[Operador["CONCATENACION"] = 0] = "CONCATENACION";
    Operador[Operador["REPETICION"] = 1] = "REPETICION";
    Operador[Operador["SUMA"] = 2] = "SUMA";
    Operador[Operador["RESTA"] = 3] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 4] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 5] = "DIVISION";
    Operador[Operador["MODULO"] = 6] = "MODULO";
    Operador[Operador["MENOS_UNARIO"] = 7] = "MENOS_UNARIO";
    Operador[Operador["MAYOR_QUE"] = 8] = "MAYOR_QUE";
    Operador[Operador["MENOR_QUE"] = 9] = "MENOR_QUE";
    Operador[Operador["IGUAL_IGUAL"] = 10] = "IGUAL_IGUAL";
    Operador[Operador["DIFERENTE_QUE"] = 11] = "DIFERENTE_QUE";
    Operador[Operador["OR"] = 12] = "OR";
    Operador[Operador["AND"] = 13] = "AND";
    Operador[Operador["NOT"] = 14] = "NOT";
    Operador[Operador["MAYOR_IGUA_QUE"] = 15] = "MAYOR_IGUA_QUE";
    Operador[Operador["MENOR_IGUA_QUE"] = 16] = "MENOR_IGUA_QUE";
    Operador[Operador["DESCONOCIDO"] = 17] = "DESCONOCIDO";
})(Operador = exports.Operador || (exports.Operador = {}));
var Operacion = /** @class */ (function () {
    function Operacion(op_izquierda, op_derecha, operacion, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.op_izquierda = op_izquierda;
        this.op_derecha = op_derecha;
        this.operador = operacion;
    }
    Operacion.prototype.traducir = function (ent, arbol) {
        //throw new Error("Method not implemented.");
    };
    Operacion.prototype.getTipo = function (ent, arbol) {
        var valor = this.getValorImplicito(ent, arbol);
        if (typeof (valor) === 'boolean') {
            return Tipo.BOOL;
        }
        else if (typeof (valor) === 'string') {
            return Tipo.STRING;
        }
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return Tipo.INT;
            }
            return Tipo.DOUBLE;
        }
        else if (valor === null) {
            return Tipo.NULL;
        }
        return Tipo.VOID;
    };
    //Metodo que solo se utiliza para determinar los tipos especficios de datos permitidos
    Operacion.prototype.getTipoDato = function (valor) {
        if (typeof (valor) === 'boolean')
            return "boolean";
        else if (typeof (valor) === 'number') {
            if (this.isInt(Number(valor))) {
                return "int";
            }
            return "double";
        }
        else if (typeof (valor) === 'string') {
            if (valor.length == 1) {
                return "char";
            }
            else
                return "string";
        }
        else if (valor === null) {
            return "null";
        }
    };
    Operacion.prototype.getValorImplicito = function (ent, arbol) {
        if (this.operador !== Operador.MENOS_UNARIO && this.operador !== Operador.NOT) {
            var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            var op2 = this.op_derecha.getValorImplicito(ent, arbol);
            // concatenacion
            if (this.operador == Operador.CONCATENACION) {
                if (typeof (op1 === "string") && typeof (op2 === "string")) {
                    return op1 + op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una concatenacion");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una concatenacion", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // repeticion
            if (this.operador == Operador.REPETICION) {
                if (typeof (op1 === "string") && typeof (op2 === "number")) {
                    if (this.isInt(Number(op2))) {
                        var repetir = 0;
                        var textoRepetir = "";
                        while (repetir < op2) {
                            textoRepetir += op1;
                            repetir++;
                        }
                        return textoRepetir;
                    }
                    else {
                        console.log("Error de tipos de datos no permitidos realizando una repeticion");
                        var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una repeticion", 1, 1);
                        var re = ReporteErrores.getInstance();
                        re.pushError(prueba);
                    }
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una repeticion");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una repeticion", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            //suma
            if (this.operador == Operador.SUMA) {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int")) {
                    return op1 + op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double")) {
                    return op1 + op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 + parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int")) {
                    return op1 + op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double")) {
                    return op1 + op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 + parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int")) {
                    return parseInt(op1) + op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double")) {
                    return parseInt(op1) + op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return parseInt(op1) + parseInt(op2);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una suma");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una suma", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            //resta
            else if (this.operador == Operador.RESTA) {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int")) {
                    return op1 - op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double")) {
                    return op1 - op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 - parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int")) {
                    return op1 - op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double")) {
                    return op1 - op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 - parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int")) {
                    return parseInt(op1) - op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double")) {
                    return parseInt(op1) - op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return parseInt(op1) - parseInt(op2);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una resta");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una resta", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            //multiplicación
            else if (this.operador == Operador.MULTIPLICACION) {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int")) {
                    return op1 * op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double")) {
                    return op1 * op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 * parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int")) {
                    return op1 * op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double")) {
                    return op1 * op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 * parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int")) {
                    return parseInt(op1) * op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double")) {
                    return parseInt(op1) * op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return parseInt(op1) * parseInt(op2);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una multiplicacion.");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una multiplicacion", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            //division
            else if (this.operador == Operador.DIVISION) {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int")) {
                    return op1 / op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double")) {
                    return op1 / op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 / parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int")) {
                    return op1 / op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double")) {
                    return op1 / op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 / parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int")) {
                    return parseInt(op1) / op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double")) {
                    return parseInt(op1) / op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return parseInt(op1) / parseInt(op2);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una division.");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una division", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            //modulo
            else if (this.operador == Operador.MODULO) {
                if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "int")) {
                    return op1 % op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "double")) {
                    return op1 % op2;
                }
                else if ((this.getTipoDato(op1) == "int") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 % parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "int")) {
                    return op1 % op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "double")) {
                    return op1 % op2;
                }
                else if ((this.getTipoDato(op1) == "double") && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return op1 % parseInt(op2);
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "int")) {
                    return parseInt(op1) % op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "double")) {
                    return parseInt(op1) % op2;
                }
                else if ((this.getTipoDato(op1) == "char") && !isNaN(Number(op1)) && (this.getTipoDato(op2) == "char") && !isNaN(Number(op2))) {
                    return parseInt(op1) % parseInt(op2);
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una modulo.");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una modulo", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // mayor
            else if (this.operador == Operador.MAYOR_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 > op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional >");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional >", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // mayor o igual 
            else if (this.operador == Operador.MAYOR_IGUA_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 >= op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional >=");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional >=", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // menor
            else if (this.operador == Operador.MENOR_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 < op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional <");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional <", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // menor o igual
            else if (this.operador == Operador.MENOR_IGUA_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 <= op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional <=");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional <=", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // igual igual
            else if (this.operador == Operador.IGUAL_IGUAL) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 == op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional ==");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional ==", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // diferente
            else if (this.operador == Operador.DIFERENTE_QUE) {
                if (typeof (op1 === "number") && typeof (op2 === "number")) {
                    return op1 != op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos para la expresion relacional !=");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos para la expresion relacional !=", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // AND
            else if (this.operador == Operador.AND) {
                if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                    return op1 && op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando un AND");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando un AND", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // OR
            else if (this.operador == Operador.OR) {
                if (typeof (op1 === "boolean") && typeof (op2 === "boolean")) {
                    return op1 || op2;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando un OR");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando un OR", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
        }
        else {
            var op1 = this.op_izquierda.getValorImplicito(ent, arbol);
            if (this.operador == Operador.MENOS_UNARIO) {
                if (typeof (op1 === "number")) {
                    return -1 * op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando una operación unaria");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando una operación unaria", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
            // not
            else if (this.operador == Operador.NOT) {
                if (typeof (op1 === "boolean")) {
                    return !op1;
                }
                else {
                    console.log("Error de tipos de datos no permitidos realizando un not");
                    var prueba = new Error("Semantico", "Error de tipos de datos no permitidos realizando un not", 1, 1);
                    var re = ReporteErrores.getInstance();
                    re.pushError(prueba);
                    return null;
                }
            }
        }
        return null;
    };
    Operacion.prototype.isInt = function (n) {
        return Number(n) === n && n % 1 === 0;
    };
    return Operacion;
}());
exports.Operacion = Operacion;
