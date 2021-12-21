# Reporte Gramatical  
___

### Gramática

\<inicio> ::= \<instrucciones> EOF                 

\<instrucciones> ::= \<instrucciones> \<instruccion>  
                              | \<instruccion>


\<instruccion> ::= \<declaracion>  
                              | \<asignacion>  
                              | \<impresion>  
                              | \<funciones>  
                              | \<cond_if>  
                              | \<cond_switch>

\<declaracion> ::= \<tipo> ID '=' \<expresion>';'              
                              | \<tipo> \<lista_declaracion> ';'                
                              | RSTRUCT ID '{' \<lista_atributos>'}' ';'  

                              | \<tipo> '[' ']' id '=' \<cuerpo_array> ';'

\<lista_atributos> ::= \<lista_atributos> ',' \<atributo>  
                              | \<atributo>
                

\<atributo> ::= \<tipo> ID  
                        | ID ID         

\<lista_declaracion> ::= \<lista_declaracion> ',' ID             
                              | ID                                                  

\<cuerpo_array> ::= '[' \<lista_parametros>']'

\<asignacion> ::= ID '=' \<expresion> ';
'  
                           | ID ID '=' ID '(' \<lista_parametros> ')' ';'
           

\<tipo> ::= \<ipo_primitivo>


\<tipo_primitivo> ::=    RINT            
                              |    RDOUBLE         
                              |    RSTRING         
                              |    RBOOLEAN        
                              |    RCHAR           
                              |    RVOID                            

\<impresion>::= RPRINTLN '(' \<lista_impresion> ')' ';'  
                         | RPRINT '(' \<expresion> ')' ';'            

\<lista_impresion> ::= \<lista_impresion> ',' \<expresion>\
\<lista_impresion> ::= \<lista_impresion> ',' \<expresion>\
                              | \<expresion>                                    

\<llamada> ::= ID '(' \<lista_parametros> ')'  
                              | ID '(' ')' 


\<lista_parametros> ::= \<lista_parametros> ',' \<expresion>  
                              | \<expresion>
               

\<nativas>::= \<tipo> '.' RPARSE '(' \<expresion> ')'  
                              | RTOINT '(' \<expresion> ')'  
                              | RTODOUBLE '(' \<expresion> ')'  
                              | RSTRING '(' \<expresion> ')'  
                              | RTYPEOF '(' \<expresion> ')'                  
                 
\<cond_if> ::= RIF '(' \<expresion> ')' \<bloque_instrucciones>                                
                              | RIF '(' \<expresion> ')' \<bloque_instrucciones> RELSE \<cond_if>                  
                              | RIF '(' \<expresion> ')' \<bloque_instrucciones> RELSE \<bloque_instrucciones>     

\<bloque_instrucciones> ::= '{' \<instrucciones_dentro> '}'                                         
                              | \<declaracion>  
                              | \<asignacion>  
                              | \<impresion>  
                              | \<llamada> ';'  
                    

\<cond_switch>     ::= RSWITCH '(' \<expresion> ')' '{' \<bloque_switch> '}'       
                

\<bloque_switch>   ::= \<bloque_switch> \<estructura_case>                                     
                              | \<estructura_case>                                                

\<estructura_case> ::= RCASE \<expresion> ':' \<instrucciones_dentro>          
                              | RDEFAULT ':' \<instrucciones_dentro>                                 

\<loop_while>      ::= RWHILE '(' \<expresion> ')' '{' \<instrucciones_dentro> '}' ;

\<loop_dowhile>    ::= RDO '{' \<instrucciones_dentro> '}' RWHILE '(' \<expresion> ')' ';' 

\<loop_for>        ::= RFOR '(' \<declarar_asignar> ';' \<expresion> ';'  \<declarar_asignar> ')' '{' \<instrucciones_dentro> '}'

\<declarar_asignar>::= tipo ID '=' \<expresion>  
                              | ID '=' \<expresion>  
                              | \<expresion>                

\<funciones>       ::= ID ID '(' ')' '{' \<instrucciones_dentro> '}'   
                             | ID ID '(' \<lista_atributos>')' '{'\<instrucciones_dentro> '}'             


\<tipo_func_arit>       ::= RPOW  
                              | RSQRT  
                              | RSIN  
                              | RCOS  
                              | RTAN              

\<func_arit>          ::= \<tipo_func_arit> '(' \<expresion> ')'

\<instrucciones_dentro> ::= \<instrucciones_dentro> \<instruccion_dentro>  
                              | \<instruccion_dentro>                                           

\<instruccion_dentro>      ::= \<declaracion>  
                              | \<asignacion>                      
                              | \<impresion>                                     
                              | \<llamada> ';'  
                              | \<cond_if>                                       
                              | \<cond_switch>                                   
                              | \<loop_while>  
                              | \<loop_dowhile>  
                              | \<loop_for>  
                              | RRETURN ';'  
                              | RRETURN \<expresion> ';'  
                              | RBREAK ';'  
                              |\<expresion> '++' ';'

                    

\<expresion> ::= '-' <expresion> UMENOS	         
                              | \<expresion> '&' \<expresion>	         
                              | \<expresion>'^' \<expresion>            
                              | \<expresion> '+' \<expresion>              
                              | \<expresion> '-' \<expresion>		         
                              | \<expresion> '*' \<expresion>	         
                              | \<expresion> '/' \<expresion>	             
                              | \<expresion> '%' \<expresion>	             
                              | \<expresion> '<' \<expresion>		         
                              | \<expresion>'>' \<expresion>	         
                              | \<expresion> '<=' \<expresion>         
                              | \<expresion> '>=' \<expresion>         
                              | \<expresion> '==' \<expresion>	         
                              | \<expresion> '!=' \<expresion>             
                              | \<expresion> '&&' \<expresion>          
                              | \<expresion> '||' \<expresion>           
                              | '!' \<expresion>	   	                 
                              | ID                                  
                              | ENTERO		                        
                              | DECIMAL				                
                              | RTRUE				                
                              | RFALSE	     	                    
                              | CADENA	                            
                              | CARACTER                            
                              | RNULL  
                              | ID '.' ID '(' ')'  
                              | ID '.' ID '(' \<lista_parametros>')'  
                              | CADENA '.' ID '(' ')'  
                              | CADENA '.' ID '(' \<lista_parametros> ')'  
                              | \<expresion> '?' \<expresion> ':' \<expresion>    
                              | \<expresion> '++'  
                              |\<expresion> '--'  
                              | llamada   
                              | nativas  
                              | func_arit  
                              | '(' \<expresion> ')'	          	    

___
### Definición dirigida por la sintaxis

inicio ->  instrucciones EOF {inicio.instr = AST(instrucciones.instr)}

instrucciones -> instrucciones instruccion   {instrucciones.instr.add(instruccion.instr); instrucciones.instr = instrucciones1.instr}        
                              | instruccion  {instrucciones.instr.add(instruccion.instr)}                      

instruccion -> declaracion                 {instruccion.instr = declaracion.instr}                         
                              | asignacion     {instruccion.instr = asignacion.instr}                          
                              | impresion      {instruccion.instr = impresion.instr}                          
                              | funciones     {instruccion.instr = funciones.instr}   
                              | cond_if        {instruccion.instr = cond_if.instr}                       
                              | cond_switch   {instruccion.instr = cond_switch.instr}                     

declaracion -> tipo ID '=' expresion ';'    {declaracion.instr = Declaracion(tipo.tipo, ID, expresion.instr)}               
                              | tipo lista_declaracion ';'          {declaracion.instr = Declaracion(tipo.tipo,lista_declaracion.instr)}
                              | RSTRUCT ID '{' lista_atributos'}' ';'  {declaracion.instr = Declaracion(RSTRUCT, id, lista_atributos.instr)}
                              | tipo '[' ']' id '=' cuerpo_array ';'   {declaracion.instr = Declaracion(tipo.tipo, id, cuerpo_array.instr)}

lista_atributos -> lista_atributos ',' atributo   {lista_atributos.instr.add(atributo.instr); lista_atributos.instr = lista_atributos1.instr}
                              | atributo    {lista_atributos.instr.add(atributo.instr)}

atributo -> tipo ID {atributo.instr = Atributo(tipo.tipo, ID)}
                              | ID ID {atributo.instr = Atributo(ID, ID)}

lista_declaracion -> lista_declaracion ',' ID         {lista_declaracion.instr.add(ID), lista_declaracion.instr = lista_declaracion1.instr}    
                              | ID       {lista_declaracion.instr.add(ID)}                             

cuerpo_array -> '[' lista_parametros']' {cuerpo_array.instr = lista_parametros.instr}

asignacion -> ID '=' expresion ';' {asignacion.instr = Asig(ID, expresion.val)}                          
                              | tipo ID '=' ID '(' lista_parametros ')' ';'   {asignacion.instr = Asig(tipo, ID, lista_parametros.instr)}  

tipo -> tipo_primitivo  {tipo.instr = tipo_primitivo.instr}

tipo_primitivo ->    RINT            { tipo_primitivo.instr =  Tipo(RINT)} 
                              |    RDOUBLE         { tipo_primitivo.instr =  Tipo(RDOUBLE)} 
                              |    RSTRING         { tipo_primitivo.instr =  Tipo(RSTRING)} 
                              |    RBOOLEAN        { tipo_primitivo.instr =  Tipo(RBOOLEAN)} 
                              |    RCHAR           { tipo_primitivo.instr =  Tipo(RCHAR)} 
                              |    RVOID           { tipo_primitivo.instr =  Tipo(RVOID)} 


impresion       -> RPRINTLN '(' lista_impresion ')' ';' {impresion.instr = PRINT(lista_expresion.instr)}  
                              | RPRINT '(' lista_impresion ')' ';'  {impresion.instr = PRINT(lista_expresion.instr)}          


lista_impresion -> lista_impresion ',' expresion       {lista_impresion.instr.add(expresion.val); lista_impresion.instr=lista_impresion1.instr}           
                              | expresion              {lista_impresion.instr.add(expresion.val)}                              

llamada         -> ID '(' lista_parametros ')'       {llamada.instr = Llamada(ID, lista_parametros.instr)}
                              | ID '(' ')'          {llamada.instr = Llamada(ID)}

lista_parametros -> lista_parametros ',' expresion      {lista_parametros.instr.add(expresion.val); lista_parametros.instr=lista_parametros1.instr}
                              | expresion               {lista_parametros.instr.add(expresion.val)}

nativas -> tipo '.' RPARSE '(' expresion ')'                        {nativas.instr = Nativas(TipoNativa(RPARSE, tipo.tipo), expresion.val)}      
                              | RTOINT '(' expresion ')'            {nativas.instr = Nativas(TipoNativa(RTOINT), expresion.val)}      
                              | RTODOUBLE '(' expresion ')'         {nativas.instr = Nativas(TipoNativa(RTODOUBLE), expresion.val)}      
                              | RSTRING '(' expresion ')'           {nativas.instr = Nativas(TipoNativa(RSTRING), expresion.val)}      
                              | RTYPEOF '(' expresion ')'           {nativas.instr = Nativas(TipoNativa(RTYPEOF), expresion.val)}      
                 
cond_if -> RIF '(' expresion ')' bloque_instrucciones    {cond_if.instr = IF(expresion.val, bloque_instrucciones.instr)}                     
                              | RIF '(' expresion ')' bloque_instrucciones RELSE cond_if  {cond_if.instr = IF(expresion.val, bloque_instrucciones.instr, cond_if.instr)}                  
                              | RIF '(' expresion ')' bloque_instrucciones  {cond_if.instr = IF(expresion.val, bloque_instrucciones.instr)} 
                              | RELSE bloque_instrucciones   {cond_if.instr = IF(bloque_instrucciones.instr)}     

bloque_instrucciones   -> '{' instrucciones_dentro '}'  {bloque_instrucciones.instr = instrucciones_dentro.instr}                     
                              | declaracion  {bloque_instrucciones.instr = declaracion.instr}
                              | asignacion  {bloque_instrucciones.instr = asignacion.instr} 
                              | impresion   {bloque_instrucciones.instr = impresion.instr}
                              | llamada ';' {bloque_instrucciones.instr = llamada.instr}

cond_switch     -> RSWITCH '(' expresion ')' '{' bloque_switch '}'    {cond_switch.instr = SWITCH(expresion.val, bloque_switch.instr)}   

bloque_switch   -> bloque_switch estructura_case        {bloque_switch.instr.add(estructura_case.instr); bloque_switch.instr = bloque_switch1.instr}                        
                              | estructura_case         {bloque_switch.instr.add(estructura_case.instr)}                            

estructura_case -> RCASE expresion ':' instrucciones_dentro      {estructura_case.instr = CASE(expresion.val, instrucciones_dentro.instr)}       
                              | RDEFAULT ':' instrucciones_dentro {estructura_case.instr = CASE(instrucciones_dentro.instr)}

loop_while -> RWHILE '(' expresion ')' '{' instrucciones_dentro '}'  {loop_while.instr = WHILE(expresion.val, instrucciones_dentro.instr)}

loop_dowhile -> RDO '{' instrucciones_dentro '}' RWHILE '(' expresion ')' ';'  {loop_dowhile.instr = DOWHILE(instrucciones_dentro.instrm expresion)}

loop_for -> RFOR '(' declarar_asignar ';' expresion ';'  declarar_asignar ')' '{' instrucciones_dentro '}'  {loop_for.instr = FOR(declarar_asignar.instr, expresion.val,  declarar_asignar.instr)}

declarar_asignar -> tipo ID '=' expresion           {declarar_asignar.instr = Asignar(tipo, ID, expresion)}
                              | ID '=' expresion    {declarar_asignar.instr = Asignar(ID, expresion)}
                              | expresion           {declarar_asignar.instr = Asignar(expresion)}

funciones  -> tipo ID '(' ')' '{' instrucciones_dentro '}'  {funciones.instr = Funcion(tipo, ID, instrucciones_dentro )}
                              | tipo ID '(' lista_atributos')' '{'instrucciones_dentro '}'  {funciones.instr = Funcion(tipo, ID, instrucciones_dentro )}
                
tipo_func_arit       -> RPOW  {tipo_func_arit.val = RPOW.val}
                              | RSQRT {tipo_func_arit.val = RSQRT.val}
                              | RSIN {tipo_func_arit.val = RSIN.val}
                              | RCOS {tipo_func_arit.val = RCOS.val}
                              | RTAN {tipo_func_arit.val = RTAN.val}

func_arit          -> tipo_func_arit '(' expresion ')'  {func_arit.val = Arit(expresion, tipo_func_arit.val)}

instrucciones_dentro -> instrucciones_dentro instruccion_dentro   {instrucciones_dentro.instr.add(instruccion_dentro); instrucciones_dentro.instr = instrucciones_dentro.instr}       
                              | instruccion_dentro  {instrucciones_dentro.instr.add(instruccion_dentro)}

instruccion_dentro      : declaracion      {instruccion_dentro.instr = declaracion.instr}
                        | asignacion       {instruccion_dentro.instr = asignacion.instr}      
                        | impresion        {instruccion_dentro.instr = impresion.instr}                       
                        | llamada ';'      {instruccion_dentro.instr = llamada.instr}         
                        | cond_if          {instruccion_dentro.instr = cond_if.instr}                               
                        | cond_switch      {instruccion_dentro.instr = cond_switch.instr}                              
                        | loop_while        {instruccion_dentro.instr = loop_while.instr}
                        | loop_dowhile      {instruccion_dentro.instr = loop_dowhile.instr}
                        | loop_for          {instruccion_dentro.instr = loop_for.instr}
                        | RRETURN ';'           {instruccion_dentro.instr = RETURN()}
                        | RRETURN expresion ';' {instruccion_dentro.instr = RETURN(expresion1)}
                        | RBREAK ';'            {instruccion_dentro.instr = Break()}
                        | expresion '++' ';'  {expresion.val = Operacion(expresion1.val, ++)}        
                        | expresion '--' ';'  {expresion.val = Operacion(expresion1.val, --)}                         

expresion -> '-' expresion                          {expresion.val = Operacion(expresion1.val, -)}                 
                        | expresion '&' expresion	{expresion.val = Operacion(expresion1.val, expresion2.val, &)} 	           	         
                        | expresion '^' expresion	{expresion.val = Operacion(expresion1.val, expresion2.val, ^)}         	                     
                        | expresion '+' expresion   {expresion.val = Operacion(expresion1.val, expresion2.val, +)}         	                    
                        | expresion '-' expresion	{expresion.val = Operacion(expresion1.val, expresion2.val, -)}         	         
                        | expresion '*' expresion	{expresion.val = Operacion(expresion1.val, expresion2.val, *)}         	         
                        | expresion '/' expresion	{expresion.val = Operacion(expresion1.val, expresion2.val, /)}              
                        | expresion '%' expresion   {expresion.val = Operacion(expresion1.val, expresion2.val, %)}     	            
                        | expresion '<' expresion	 {expresion.val = Operacion(expresion1.val, expresion2.val, <)}        	         
                        | expresion '>' expresion	 {expresion.val = Operacion(expresion1.val, expresion2.val, >)}         
                        | expresion '<=' expresion	 {expresion.val = Operacion(expresion1.val, expresion2.val, <=)}                
                        | expresion '>=' expresion	 {expresion.val = Operacion(expresion1.val, expresion2.val, >=)}              
                        | expresion '==' expresion	 {expresion.val = Operacion(expresion1.val, expresion2.val, ==)}                 
                        | expresion '!=' expresion   {expresion.val = Operacion(expresion1.val, expresion2.val, !=)}
                        | expresion '&&' expresion    {expresion.val = Operacion(expresion1.val, expresion2.val, &&)}
                        | expresion '||' expresion    {expresion.val = Operacion(expresion1.val, expresion2.val, ||)}         
                        | '!' expresion	   	          {expresion.val = Operacion(expresion1.val, !)}      
                        | ID            {expresion.val = Primitivo(ID)}                        
                        | ENTERO		{expresion.val = Primitivo(ENTERO)}                          
                        | DECIMAL		{expresion.val = Primitivo(DECIMAL)}  		                
                        | RTRUE			{expresion.val = Primitivo(RTRUE)}  	                
                        | RFALSE	    {expresion.val = Primitivo(RFALSE)}      	                    
                        | CADENA	    {expresion.val = Primitivo(CADENA)}                          
                        | CARACTER      {expresion.val = Primitivo(CARACTER)}                        
                        | RNULL         {expresion.val = Primitivo(RNULL)}                        
                        | ID '.' ID '(' ')'
                        | ID '.' ID '(' lista_parametros')'
                        | CADENA '.' ID '(' ')'
                        | CADENA '.' ID '(' lista_parametros ')'
                        | expresion '?' expresion ':' expresion
                        | expresion '++'        {expresion.val = Operacion(expresion1.val, ++)}        	              
                        | expresion '--'        {expresion.val = Operacion(expresion1.val, --)}        
                        | llamada               {expresion.val = llamada.val}        	              
                        | nativas               {expresion.val = nativas.val}        	              
                        | func_arit             {expresion.val = func_arit.val}        	              
                        | '(' expresion ')'	    {expresion.val = expresion.val}        	              


### Precedencia:  

- right'?'
- left '||' 
- left '&&' 
- left '<' '<=' '>' '>=' '==' '!='
- left '+' '-' '&'
- left '*' '/' '%' '^'
- left UMENOS
- right '!'
- right '++' '--'

### Simbolos terminales: 
"void"          
"null"          
"int"           
"double"        
"String"        
"boolean"       
"char"          
"true"          
"false"         
"struct"        
"print"         
"println"       
"pow"           
"sin"           
"cos"           
"tan"           
"log10"         
"sqrt"          
"toInt"         
"toDouble"      
"typeof"        
"return"        
"if"          
"else"        
"switch"      
"case"        
"default"     
"while"       
"do"          
"for"         
"in"          
"push"        
"pop"         
"length"      
"parse"       
"break"       
"continue"    
"graficar_ts" 

":" 
"." 
"," 
";" 
"{" 
"}" 
"(" 
")" 
"[" 
"]" 
"%" 
"++"
"--"
"+" 
"^" 
"-" 
"*" 
"/" 
">="
"=="
"!="
"<" 
">" 
"&" 
"||"
"!" 
"?" 
'DECIMAL'
'ENTERO'
'BOOLEANO'
'ID'

### Simbolos no terminales:
inicio 
instrucciones 
instruccion 
declaracion 
lista_atributos 
atributo 
lista_declaracion 
cuerpo_array
asignacion 
tipo 
tipo_primitivo 
impresion  
lista_impresion 
llamada        
lista_parametros 
nativas      
cond_if 
bloque_instrucciones  
cond_switch     
bloque_switch   
estructura_case 
loop_while
loop_dowhile 
loop_for
declarar_asignar
funciones 
tipo_func_arit                           
func_arit        
instrucciones_dentro                   
instruccion_dentro   
expresion 