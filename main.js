function ejecutar(){
    
    const content = entrada.getValue();
    const ast = gramatica.parse(content);    
    const entornoGlobal = new Entorno(null);

    salida.setValue('');
    ast.instrucciones.forEach((element) => {
        element.ejecutar(entornoGlobal,ast);
    })
}

function mostrarErrores(){

    document.getElementById('errores').style.display = "block";
    const tablaErrores = ReporteErrores.getInstance().getErrores();

    let html = `<h4>Tabla de Errores</h4>
    <table id="tablaSimbolos" style="width:100%">
    <thead>
    <tr>
    <th>Tipo</th>
    <th>Descripcion</th>
    <th>Fila</th>
    <th>Columna</th>
    </tr>
    </thead>
    <tbody>
    `;
    console.log(tablaErrores);
    var i = 0;
    for (i = 0; i < tablaErrores.length; i++) {
        let simbolo = tablaErrores[i];
        html += `<tr>
                <td>${simbolo.tipo}</td>
                <td>${simbolo.descripcion}</td>
                <td>${simbolo.linea}</td>
                <td>${simbolo.columna}</td>
                </tr>`
            }
    

    html += `</tbody>
    </table>`;

    document.getElementById('errores').innerHTML = html;
    
}
