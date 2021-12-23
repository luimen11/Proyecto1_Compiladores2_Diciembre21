## Manual Técnico


---
## Herramientas usadas
```Jison:``` Generador de analizadores léxicos y sintácticos.  <br> 

```JavaScript:``` Es un lenguaje de programación ligero, interpretado, o compilado,con funciones de primera clase.<br>

```TypeScript:``` Es un lenguaje de programación construido a un nivel superior de JavaScript, TypeScript dota al lenguaje de varias características adicionales como: escribir código con menos errores, más sencillo, más limpio y sólido. <br>

---
## Gramatica
Gramatica Implementada en Jison.

#### **Componentes de la gramatica:**
    inicio : instrucciones EOF;

    instrucciones
     : instrucciones instruccion   
    | instruccion   ;

instruccion
    : declaracion                        
    | asignacion                        
    | impresion                          
    | funciones                          
    | cond_if                            
    | cond_switch                       
    | loop_while                         
    | loop_dowhile                       
    | func_graficar                      
;

declaracion : tipo ID '=' expresion ';'                 
            | tipo lista_declaracion ';'                
            | RSTRUCT ID '{' lista_atributos'}' ';'
            | tipo '[' ']' ID '=' cuerpo_array ';'      
;

lista_atributos : lista_atributos ',' atributo          
                | atributo                              
                ;

atributo : tipo ID   
         | ID ID                        
         ;

lista_declaracion : lista_declaracion ',' ID             
                  | ID                                    
                ;

cuerpo_array        : '[' lista_parametros']'           
                    ;

asignacion : ID '=' expresion ';'                            
           | ID '[' expresion ']' '=' expresion ';'          
           | ID ID '=' ID '(' lista_parametros ')' ';'
           ;

tipo        : tipo_primitivo        
;

tipo_primitivo :    RINT             
               |    RDOUBLE         
               |    RSTRING         
               |    RBOOLEAN       
               |    RCHAR           
               |    RVOID          
;                    

impresion       : RPRINTLN '(' lista_impresion ')' ';'          
                | RPRINT '(' lista_impresion ')' ';'            
;

lista_impresion : lista_impresion ',' expresion                
                | expresion                                   
;

llamada         : ID '(' lista_parametros ')'                   
                | ID '(' ')'                                    
;

lista_parametros : lista_parametros ',' expresion              
                 | expresion                                    
;                 

nativas          : tipo '.' RPARSE '(' expresion ')'
                 | RTOINT '(' expresion ')'
                 | RTODOUBLE '(' expresion ')'
                 | RSTRING '(' expresion ')'
                 | RTYPEOF '(' expresion ')'                 
;                 
                 
cond_if         : RIF '(' expresion ')' bloque_instrucciones                                              
                | RIF '(' expresion ')' bloque_instrucciones RELSE cond_if                  
                | RIF '(' expresion ')' bloque_instrucciones RELSE bloque_instrucciones     
;

bloque_instrucciones   : '{' instrucciones_dentro '}'                                         
                        | declaracion
                        | asignacion
                        | impresion
                        | llamada ';'
                       ; 

    cond_switch     : RSWITCH '(' expresion ')' '{' bloque_switch '}'       
                    ;

    bloque_switch   : bloque_switch estructura_case                                    
                    | estructura_case                                                   
                    ;

    estructura_case : RCASE expresion ':' instrucciones_dentro          
                    | RDEFAULT ':' instrucciones_dentro                 
                    ;

    loop_while      : RWHILE '(' expresion ')' '{' instrucciones_dentro '}'   
                    ;

    loop_dowhile    : RDO '{' instrucciones_dentro '}' RWHILE '(' expresion ')' ';'  
                    ;

    loop_for        : RFOR '(' declarar_asignar ';' expresion ';'  declarar_asignar ')' '{' instrucciones_dentro '}' ;

    declarar_asignar: tipo ID '=' expresion
                   | ID '=' expresion
                   | expresion
                ;

    funciones       : tipo ID '(' ')' '{' instrucciones_dentro '}'                         
                    | tipo ID '(' lista_atributos')' '{'instrucciones_dentro '}'         
                 ;


    func_arit            : RPOW  '(' expresion ',' expresion ')'
                         | RSQRT '(' expresion ')'
                         | RSIN  '(' expresion ')'
                         | RCOS  '(' expresion ')'
                         | RTAN  '(' expresion ')';                

    func_graficar : RGRAFICAR '(' ')' ';' ;

    instrucciones_dentro : instrucciones_dentro instruccion_dentro          
                         | instruccion_dentro                               
                    ;

    instruccion_dentro      : declaracion                                       
                            | asignacion                                         
                            | impresion                                          
                            | llamada ';'                                        
                            | cond_if                                            
                            | cond_switch                                       
                            | loop_while                                         
                            | loop_dowhile                                       
                            | loop_for
                            | RRETURN ';'                                        
                            | RRETURN expresion ';'                              
                            | func_graficar                                     
                            | RBREAK ';'                                        

                            | expresion '++'';'
                            | expresion '--'';'
                         ;

    expresion : '-' expresion %prec UMENOS	        
          | expresion '&' expresion		        
          | expresion '^' expresion	            

          | expresion '+' expresion            
          | expresion '-' expresion		
          | expresion '*' expresion		
          | expresion '/' expresion	        
          | expresion '%' expresion	        
          
          | expresion '<' expresion
          | expresion '>' expresion
          | expresion '<=' expresion
          | expresion '>=' expresion
          | expresion '==' expresion
          | expresion '!=' expresion
          
          | expresion '&&' expresion            
          | expresion '||' expresion            
          | '!' expresion	   	        
          
          | ID
          | ENTERO
          | DECIMAL				             
          | RTRUE				             
          | RFALSE	     	                    
          | CADENA	                            
          | CARACTER                            
          | RNULL                               
          
          | ID '[' expresion ']'              

          | ID '.' ID '(' ')'
          | ID '.' ID '(' lista_parametros')'
          | CADENA '.' ID '(' ')'
          | CADENA '.' ID '(' lista_parametros ')'
          | expresion '?' expresion ':' expresion

          | expresion '++'
          | expresion '--'       
          | llamada                              
          | nativas
          | func_arit
          | '(' expresion ')'	          	    
          ;


