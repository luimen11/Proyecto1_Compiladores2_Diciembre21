
function ejecutar(){
    
    const content = entrada.getValue();
    const ast = gramatica.parse(content);    
    const entornoGlobal = new Entorno(null);

    salida.setValue('');
    ast.instrucciones.forEach((element) => {
        element.ejecutar(entornoGlobal,ast);
    })
}
