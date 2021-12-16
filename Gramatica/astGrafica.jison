%lex

%%

\s+                                         /* skip whitespace */
"//".*                                      //'.*      /* skip comment */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         /* IGNORE */

//RESERVADAS

"void"              return 'RVOID';
"null"              return 'RNULL';
"int"               return 'RINT';
"double"            return 'RDOUBLE';
"String"            return 'RSTRING';
"boolean"           return 'RBOOLEAN';
"char"              return 'RCHAR'
"true"              return 'RTRUE';
"false"             return 'RFALSE';
"struct"            return 'RSTRUCT';
"print"             return 'RPRINT';
"println"           return 'RPRINTLN';
"pow"               return 'RPOW';
"sin"               return 'RSIN';
"cos"               return 'RCOS';
"tan"               return 'RTAN';
"log10"             return 'RLOG';
"sqrt"              return 'RSQRT';
"toInt"             return 'RTOINT';
"toDouble"          return 'RTODOUBLE';
"typeof"            return 'RTYPEOF';
"return"            return 'RRETURN';
"if"                return 'RIF';
"else"              return 'RELSE';
"switch"            return 'RSWITCH';
"case"              return 'RCASE';
"default"           return 'RDEFAULT';
"while"             return 'RWHILE';
"do"                return 'RDO';
"for"               return 'RFOR';
"in"                return 'RIN';
"push"              return 'RPUSH';
"pop"               return 'RPOP';
"length"            return 'RLENGTH';
"parse"             return 'RPARSE';
"break"             return 'RBREAK';
"continue"          return 'RCONTINUE';


":"                 return ':';
"."                 return '.';
","                 return ',';
";"                 return ';';
"{"                 return '{';
"}"                 return '}';
"("                 return '(';
")"                 return ')';
"["                 return '[';
"]"                 return ']';

"%"                 return '%';
"++"                return '++';
"--"                return '--';
"+"                 return '+';
"^"                 return '^';

"-"                 return '-';
"*"                 return '*';
"/"                 return '/';

"<="                return '<=';
">="                return '>=';
"=="                return '==';
"!="                return '!=';
"<"                 return '<';
">"                 return '>';

"&&"                return '&&';
"&"                 return '&';
"||"                return '||';
"!"                 return '!';

"="                 return '=';
"?"                 return '?';



\"[^\"]*\"                 { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'                 { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }


[0-9]+("."[0-9]+)\b         return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';
"false"|"true"              return 'BOOLEANO';
([a-zA-Z])[a-zA-Z0-9_]*     return 'ID';

<<EOF>>                     return 'EOF';
.                           {console.log("Lexico", yytext,  yylloc.first_line, yylloc.first_column);}
//return new Err("Lexico", yytext,  yylloc.first_line, yylloc.first_column);

/lex

%{

%}


%right'?'
%left '||' 
%left '&&' 
%left '<' '<=' '>' '>=' '==' '!='
%left '+' '-' '&'
%left '*' '/' '%' '^'
%left UMENOS
%right '!'
%right '++' '--'

%start inicio

%% /* Definición de la gramática */

inicio
    : instrucciones EOF           { $$ = {node: newNode(yy, yystate, $1.node, 'EOF') }; return $$; }                                  
;

instrucciones
    : instrucciones instruccion     { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}     
    | instruccion                   { $$ = { node: newNode(yy, yystate, $1.node) }}  
;

instruccion
    : declaracion                   { $$ = { node: newNode(yy, yystate, $1.node) }}                          
    | asignacion                    { $$ = { node: newNode(yy, yystate, $1.node) }}                               
    | impresion                     { $$ = { node: newNode(yy, yystate, $1.node) }}                          
    | funciones                     { $$ = { node: newNode(yy, yystate, $1.node) }}                          
    | cond_if                       { $$ = { node: newNode(yy, yystate, $1.node) }}                          
    | cond_switch                   { $$ = { node: newNode(yy, yystate, $1.node) }}                          
;

declaracion : tipo ID '=' expresion ';'             { $$ = { node: newNode(yy, yystate, $1.node, $2, $4.node) }}
            | tipo lista_declaracion ';'            { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}
            | RSTRUCT ID '{' lista_atributos'}' ';' 
            | tipo '[' ']' ID '=' cuerpo_array ';'  { $$ = { node: newNode(yy, yystate, $1.node, $4, $6.node) }}
;

lista_atributos : lista_atributos ',' atributo      { $$ = { node: newNode(yy, yystate, $1.node, $3.node) }}
                | atributo                          { $$ = { node: newNode(yy, yystate, $1.node) }}
                ;

atributo : tipo ID      { $$ = { node: newNode(yy, yystate, $1.node, $2) }}
         | ID ID        { $$ = { node: newNode(yy, yystate, $1, $2) }}    
         ;

lista_declaracion : lista_declaracion ',' ID    { $$ = { node: newNode(yy, yystate, $1.node, $3) }}    
                  | ID                          { $$ = { node: newNode(yy, yystate, $1) }}    
                ;

cuerpo_array        : '[' lista_parametros']' ;

asignacion : ID '=' expresion ';'                       { $$ = { node: newNode(yy, yystate, $1, $2.node) }}                            
           | ID ID '=' ID '(' lista_parametros ')' ';'  { $$ = { node: newNode(yy, yystate, $1, $2, $4, $6.node) }}    
           ;

tipo        : tipo_primitivo      { $$ = { node: newNode(yy, yystate, $1.node) }}    
;

tipo_primitivo :    RINT            { $$ = { node: newNode(yy, yystate, $1) }}
               |    RDOUBLE         { $$ = { node: newNode(yy, yystate, $1) }}
               |    RSTRING         { $$ = { node: newNode(yy, yystate, $1) }}
               |    RBOOLEAN        { $$ = { node: newNode(yy, yystate, $1) }}
               |    RCHAR           { $$ = { node: newNode(yy, yystate, $1) }}
               |    RVOID           { $$ = { node: newNode(yy, yystate, $1) }}
;                    

impresion       : RPRINTLN '(' lista_impresion ')' ';'  { $$ = { node: newNode(yy, yystate, $1, $3.node) }}           
                | RPRINT '(' expresion ')' ';'          { $$ = { node: newNode(yy, yystate, $1, $3.node) }}           
;

lista_impresion : lista_impresion ',' expresion         { $$ = { node: newNode(yy, yystate, $1.node, $3.node) }}
                | expresion                             { $$ = { node: newNode(yy, yystate, $1.node) }}                 
;

llamada         : ID '(' lista_parametros ')'           { $$ = { node: newNode(yy, yystate, $1, $3.node) }}           
                | ID '(' ')'                            { $$ = { node: newNode(yy, yystate, $1) }}                               
;

lista_parametros : lista_parametros ',' expresion       { $$ = { node: newNode(yy, yystate, $1.node, $3.node) }}           
                 | expresion                            { $$ = { node: newNode(yy, yystate, $1.node) }}           
;                 

nativas          : tipo '.' RPARSE '(' expresion ')'    { $$ = { node: newNode(yy, yystate, $1.node, $3, $5.node) }}
                 | RTOINT '(' expresion ')'             { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                 | RTODOUBLE '(' expresion ')'          { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                 | RSTRING '(' expresion ')'            { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                 | RTYPEOF '(' expresion ')'            { $$ = { node: newNode(yy, yystate, $1, $3.node) }}     
;                 
                 
cond_if         : RIF '(' expresion ')' bloque_instrucciones                                { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node) }}                               
                | RIF '(' expresion ')' bloque_instrucciones RELSE cond_if                  { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node, $6, $7.node) }}
                | RIF '(' expresion ')' bloque_instrucciones RELSE bloque_instrucciones     { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node, $6, $7.node) }}    
;

bloque_instrucciones   : '{' instrucciones_dentro '}'    { $$ = { node: newNode(yy, yystate, $1.node) }}                                      
                        | declaracion                    { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | asignacion                     { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | impresion                      { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | llamada ';'                    { $$ = { node: newNode(yy, yystate, $1.node) }} 
                       ; 

cond_switch     : RSWITCH '(' expresion ')' '{' bloque_switch '}'  { $$ = { node: newNode(yy, yystate, $1, $3.node, $6.node) }}      
                ;

bloque_switch   : bloque_switch estructura_case { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}                                      
                | estructura_case               { $$ = { node: newNode(yy, yystate, $1.node) }}                                        
                ;

estructura_case : RCASE expresion ':' instrucciones_dentro  { $$ = { node: newNode(yy, yystate, $1, $2.node, $4.node) }}          
                | RDEFAULT ':' instrucciones_dentro         { $$ = { node: newNode(yy, yystate, $1, $3.node) }} 
                ;

loop_while      : RWHILE '(' expresion ')' '{' instrucciones_dentro '}'            { $$ = { node: newNode(yy, yystate, $1, $3.node, $6.node) }} ;

loop_dowhile    : RDO '{' instrucciones_dentro '}' RWHILE '(' expresion ')' ';'    { $$ = { node: newNode(yy, yystate, $1, $3.node, $5, $7.node) }} ;

loop_for        : RFOR '(' declarar_asignar ';' expresion ';'  declarar_asignar ')' '{' instrucciones_dentro '}'    { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node, $7.node, $10.node) }} ;

declarar_asignar: tipo ID '=' expresion  { $$ = { node: newNode(yy, yystate, $1.node, $2, $4.node) }} 
                | ID '=' expresion       { $$ = { node: newNode(yy, yystate, $1, $3.node) }}    
                | expresion              { $$ = { node: newNode(yy, yystate, $1.node) }} 
                ;

funciones       : ID ID '(' ')' '{' instrucciones_dentro '}'                { $$ = { node: newNode(yy, yystate, $1, $2, $6.node) }} 
                | ID ID '(' lista_atributos')' '{'instrucciones_dentro '}'  { $$ = { node: newNode(yy, yystate, $1, $2, $4.node, $7.node) }} 
                ;


tipo_func_arit       : RPOW             { $$ = { node: newNode(yy, yystate, $1) }} 
                     | RSQRT            { $$ = { node: newNode(yy, yystate, $1) }} 
                     | RSIN             { $$ = { node: newNode(yy, yystate, $1) }}     
                     | RCOS             { $$ = { node: newNode(yy, yystate, $1) }} 
                     | RTAN             { $$ = { node: newNode(yy, yystate, $1) }}                
;                

func_arit          : tipo_func_arit '(' expresion ')'           { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}                
;

instrucciones_dentro : instrucciones_dentro instruccion_dentro      { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}                    
                     | instruccion_dentro                           { $$ = { node: newNode(yy, yystate, $1.node) }}                          
                    ;

instruccion_dentro      : declaracion               { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | asignacion                { $$ = { node: newNode(yy, yystate, $1.node) }}                    
                        | impresion                 { $$ = { node: newNode(yy, yystate, $1.node) }}                                     
                        | llamada ';'               { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | cond_if                   { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | cond_switch               { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | loop_while                { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | loop_dowhile              { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | loop_for                  { $$ = { node: newNode(yy, yystate, $1.node) }}                
                        | RRETURN ';'               { $$ = { node: newNode(yy, yystate, $1) }}                
                        | RRETURN expresion ';'     { $$ = { node: newNode(yy, yystate, $1, $2.node) }}                
                        | RBREAK ';'                { $$ = { node: newNode(yy, yystate, $1) }}                
                        
                        | expresion '++'';'         { $$ = { node: newNode(yy, yystate, $1.node, $2) }}                
                        | expresion '--'';'         { $$ = { node: newNode(yy, yystate, $1.node, $2) }}                
                        ;

expresion : '-' expresion %prec UMENOS	    { $$ = { node: newNode(yy, yystate, $1, $2.node) }}                
          | expresion '&' expresion		    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '^' expresion	        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                        

          | expresion '+' expresion         { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}           
          | expresion '-' expresion		    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '*' expresion		    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '/' expresion	        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '%' expresion	        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          
          | expresion '<' expresion		    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '>' expresion		    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '<=' expresion	    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '>=' expresion	    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '==' expresion	    { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | expresion '!=' expresion        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
        
          | expresion '&&' expresion        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}               
          | expresion '||' expresion        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}                
          | '!' expresion	   	            { $$ = { node: newNode(yy, yystate, $1, $2.node) }}                
          
          | ID                              { $$ = { node: newNode(yy, yystate, $1) }}                
          | ENTERO		                    { $$ = { node: newNode(yy, yystate, $1) }}            
          | DECIMAL				            { $$ = { node: newNode(yy, yystate, $1) }}    
          | RTRUE				            { $$ = { node: newNode(yy, yystate, $1) }}        
          | RFALSE	     	                { $$ = { node: newNode(yy, yystate, $1) }}        
          | CADENA	                        { $$ = { node: newNode(yy, yystate, $1) }}        
          | CARACTER                        { $$ = { node: newNode(yy, yystate, $1) }}        
          | RNULL                           { $$ = { node: newNode(yy, yystate, $1) }}        
          
          | ID '.' ID '(' ')'
          | ID '.' ID '(' lista_parametros')'
          | CADENA '.' ID '(' ')'
          | CADENA '.' ID '(' lista_parametros ')'
          | expresion '?' expresion ':' expresion   { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node, $4, $5.node) }}           

          | expresion '++'                  { $$ = { node: newNode(yy, yystate, $1.node, $2) }}           
          | expresion '--'                  { $$ = { node: newNode(yy, yystate, $1.node, $2) }}           
          | llamada                         { $$ = { node: newNode(yy, yystate, $1.node) }}           
          | nativas                         { $$ = { node: newNode(yy, yystate, $1.node) }}           
          | func_arit                       { $$ = { node: newNode(yy, yystate, $1.node) }}           
          | '(' expresion ')'	          	{ $$ = { node: newNode(yy, yystate, $1, $2.node, $3) }}               
          ;
