var ast = null;
var entornoGlobal=null;

function ejecutar(){
    
    document.getElementById("console").value = "";
    const content = entrada.getValue();
    ast = gramatica.parse(content);    
    entornoGlobal = new Entorno(null);
    
    salida.setValue('');

    ast.instrucciones.forEach((element) => {
        
        if(element.constructor.name.toString() == "Declaracion" || element.constructor.name.toString() == "DeclaracionArreglo"){
            element.ejecutar(entornoGlobal,ast);
        }
    })

    const noMain = ast.ejecutarMain();

    if(noMain == null){
        console.log("no existe main");
    }else {
        ast.funciones[noMain].ejecutar(entornoGlobal,ast);
    }

    
}

function mostrarErrores(){

    document.getElementById('errores').style.display = "block";
    const tablaErrores = ReporteErrores.getInstance().getErrores();

    let html = `<h4>Tabla de Errores</h4>
    <table border=1 align="center" id="tablaSimbolos" style="width:100%">
    <thead>
    <tr bgcolor=darkred>
    <th style="color:white">Tipo</th>
    <th style="color:white"> Descripcion</th>
    <th style="color:white">Linea</th>
    <th style="color:white">Columna</th>
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
    </table> </br></br><hr>`;

    document.getElementById('errores').innerHTML = html;
    
}

function mostrarTablaSimbolos(){

    document.getElementById('simbolos').style.display = "block";
    let html = `<h4>Tabla de simbolos</h4>
    <table border=1 align="center" id="tablaSimbolos" style="width:100%">
    <thead>
    <tr bgcolor=darkred>
    <th style="color:white">ID</th>
    <th style="color:white"> Valor</th>
    <th style="color:white">Tipo</th>
    <th style="color:white">Entorno</th>
    </tr>
    </thead>
    <tbody>
    `;
    var dic = entornoGlobal.tabla    
    console.log(dic);

    for (var key in dic) {        
        if (dic.hasOwnProperty(key)) {           
            console.log(key, dic[key]);
            html += `<tr>
                <td>${dic[key].indentificador}</td>                
                <td>${dic[key].valor}</td> 
                <td>${getTipo(dic[key].tipo)}</td> 
                <td>global</td> 
                </tr>`
        }
    }
    html += `</tbody>
    </table> </br></br><hr>`;

    document.getElementById('simbolos').innerHTML = html;    
}


function getTipo(tipo){
    if(tipo === 0)
        return "String";
    else if(tipo === 1)
        return  "Int";
    else if(tipo === 2)
        return  "Double";
    else if(tipo === 3)
        return  "Bool";
    else if(tipo === 4)
        return  "Char";
    else if(tipo === 5)
        return  "Void";
    else if(tipo === 6)
        return  "Struct";
    else if(tipo === 7)
        return  "Null";
    else if(tipo === 8)
        return  "Atributo";
    else if(tipo === 9)
        return  "Array";
}




function graficar(){
    const content = entrada.getValue();
    var result = astGrafica.parse(content);
    generateTree([result.node]);

}

function newNode(yy, state, ...nodes) {
    const parent = getNonTerminal(yy, state);
    const children = [];
    for (let node of nodes) {
        node.parent = node.parent ? node.parent : parent;
        if (node.parent == parent) {
            children.push(node);
        } else if (typeof node == 'string') {
            children.push({
                name: node,
                parent,
                children: []
            });
        } else {
            children.push({
                name: node.parent,
                parent,
                children: [node]
            });
        }
    }

    return {
        name: parent,
        parent: null,
        children
    }

    function getNonTerminal(yy, state) {
        const simbolos = yy.parser.symbols_;
        const produccion = yy.parser.productions_[state];
        let nonTerminal = '';
        for (let sim in simbolos) {
            if (simbolos[sim] === produccion[0]) {
                nonTerminal = sim;
                break;
            }
        }
        return nonTerminal;
    }
}
