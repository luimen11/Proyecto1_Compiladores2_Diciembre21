class GraficarTS {

    ejecutar(ent, ast){
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
        var dic = ent.tabla    
        console.log(dic);
    
        for (var key in dic) {        
            if (dic.hasOwnProperty(key)) {           
                console.log(key, dic[key]);
                html += `<tr>
                    <td>${dic[key].indentificador}</td>                
                    <td>${dic[key].valor}</td> 
                    <td>${getTipo(dic[key].tipo)}</td> 
                    <td></td> 
                    </tr>`
            }
        }
        html += `</tbody>
        </table> </br></br><hr>`;
    
        document.getElementById('simbolos').innerHTML = html;  
        return null;
    }
}