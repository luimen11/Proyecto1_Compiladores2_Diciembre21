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
"graficar_ts"       return 'RGRAFICAR';


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
    : instrucciones EOF                 {return new AST($1,$1);}       
;

instrucciones
    : instrucciones instruccion         { $1.push($2); $$ = $1;}
    | instruccion                       { $$ = [$1]; }   
;

instruccion
    : declaracion                        { $$ = $1 }
    | asignacion                         { $$ = $1 }
    | impresion                          { $$ = $1 }
    | funciones                          { $$ = $1 }
    | cond_if                            { $$ = $1 }
    | cond_switch                        { $$ = $1 }
    | loop_while                         { $$ = $1 }
    | loop_dowhile                       { $$ = $1 }
    | func_graficar                      { $$ = $1 }
;

declaracion : tipo ID '=' expresion ';'                 { $$ = new Declaracion([$2],$1, @1.first_line, @1.first_column,$4); }
            | tipo lista_declaracion ';'                { $$ = new Declaracion($2, $1, @1.first_line, @1.first_column); } 
            | RSTRUCT ID '{' lista_atributos'}' ';'
            | tipo '[' ']' ID '=' cuerpo_array ';'      { $$ = new DeclaracionArreglo($4, $1, @1.first_line, @1.first_column,$6); } 
;

lista_atributos : lista_atributos ',' atributo          { $1.push($3); $$ = $1; }
                | atributo                              { $$ = [$1] }
                ;

atributo : tipo ID                                  { $$ = new Simbolo($1, $2, @1.first_line, @1.first_column); } 
         | ID ID                        
         ;

lista_declaracion : lista_declaracion ',' ID             { $1.push($3); $$ = $1; }
                  | ID                                   { $$ = [$1] } 
                ;

cuerpo_array        : '[' lista_parametros']'           { $$ = $2 }
                    ;

asignacion : ID '=' expresion ';'                           { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); } 
           | ID '[' expresion ']' '=' expresion ';'         { $$ = new AsignacionArreglo($1, $3,$6, @1.first_line, @1.first_column); } 
           | ID ID '=' ID '(' lista_parametros ')' ';'
           ;

tipo        : tipo_primitivo        { $$ = $1 }
;

tipo_primitivo :    RINT            { $$ =  Tipo.INT;} 
               |    RDOUBLE         { $$ =  Tipo.DOUBLE;} 
               |    RSTRING         { $$ =  Tipo.STRING;} 
               |    RBOOLEAN        { $$ =  Tipo.BOOL;} 
               |    RCHAR           { $$ =  Tipo.CHAR;} 
               |    RVOID           { $$ =  Tipo.VOID;} 
;                    

impresion       : RPRINTLN '(' lista_impresion ')' ';'          { $$ = new Print($3, @1.first_line, @1.first_column,true); }
                | RPRINT '(' lista_impresion ')' ';'            { $$ = new Print($3, @1.first_line, @1.first_column,false); }
;

lista_impresion : lista_impresion ',' expresion                 { $1.push($3); $$ = $1;}
                | expresion                                     { $$ = [$1]; }
;

llamada         : ID '(' lista_parametros ')'                   {$$ = new Llamada($1,$3, @1.first_line, @1.first_column); }
                | ID '(' ')'                                    {$$ = new Llamada($1,[], @1.first_line, @1.first_column); }
;

lista_parametros : lista_parametros ',' expresion               { $1.push($3); $$ = $1;}
                 | expresion                                    { $$ = [$1]; }
;                 

nativas          : tipo '.' RPARSE '(' expresion ')'
                 | RTOINT '(' expresion ')'
                 | RTODOUBLE '(' expresion ')'
                 | RSTRING '(' expresion ')'
                 | RTYPEOF '(' expresion ')'                 
;                 
                 
cond_if         : RIF '(' expresion ')' bloque_instrucciones                                { $$ = new If($3, $5, [],[], @1.first_line, @1.first_column); }                 
                | RIF '(' expresion ')' bloque_instrucciones RELSE cond_if                  { $$ = new If($3, $5, [],[$7], @1.first_line, @1.first_column); }
                | RIF '(' expresion ')' bloque_instrucciones RELSE bloque_instrucciones     { $$ = new If($3, $5, $7,[], @1.first_line, @1.first_column); }
;

bloque_instrucciones   : '{' instrucciones_dentro '}'                                         { $$ = $2 }
                        | declaracion
                        | asignacion
                        | impresion
                        | llamada ';'
                       ; 

cond_switch     : RSWITCH '(' expresion ')' '{' bloque_switch '}'       { $$ = new Switch($3,$6,@1.first_line, @1.first_column); }
                ;

bloque_switch   : bloque_switch estructura_case                                     { $1.push($2); $$ = $1;}
                | estructura_case                                                   { $$ = [$1]; }
                ;

estructura_case : RCASE expresion ':' instrucciones_dentro          { $$ = new Case($2,$4,@1.first_line, @1.first_column); }
                | RDEFAULT ':' instrucciones_dentro                 { $$ = new Case([],$3,@1.first_line, @1.first_column,true); }
                ;

loop_while      : RWHILE '(' expresion ')' '{' instrucciones_dentro '}'   { $$ = new While($3,$6,@1.first_line, @1.first_colum); }
                ;

loop_dowhile    : RDO '{' instrucciones_dentro '}' RWHILE '(' expresion ')' ';'  { $$ = new DoWhile($7,$3,@1.first_line, @1.first_colum); }
                ;

loop_for        : RFOR '(' declarar_asignar ';' expresion ';'  declarar_asignar ')' '{' instrucciones_dentro '}' ;

declarar_asignar: tipo ID '=' expresion
                | ID '=' expresion
                | expresion
                ;

funciones       : tipo ID '(' ')' '{' instrucciones_dentro '}'                         { $$ = new Funcion($1,$2,[],$6,@1.first_line, @1.first_column); }
                | tipo ID '(' lista_atributos')' '{'instrucciones_dentro '}'           { $$ = new Funcion($1,$2,$4,$7,@1.first_line, @1.first_column); }
                ;


tipo_func_arit       : RPOW
                     | RSQRT
                     | RSIN
                     | RCOS
                     | RTAN
;                

func_arit          : tipo_func_arit '(' expresion ')'
;

func_graficar
    : RGRAFICAR '(' ')' ';' { $$ = new GraficarTS() }
;

instrucciones_dentro : instrucciones_dentro instruccion_dentro          { $1.push($2); $$ = $1;}
                     | instruccion_dentro                               { $$ = [$1]; }
                    ;

instruccion_dentro      : declaracion                                        { $$ = $1 }                     
                        | asignacion                                         { $$ = $1 }
                        | impresion                                          { $$ = $1 }
                        | llamada ';'                                        { $$ = $1 }
                        | cond_if                                            { $$ = $1 } 
                        | cond_switch                                        { $$ = $1 } 
                        | loop_while                                         { $$ = $1 }
                        | loop_dowhile                                       { $$ = $1 }
                        | loop_for
                        | RRETURN ';'                                        { $$ = new Return([],@1.first_line, @1.first_column); }
                        | RRETURN expresion ';'                              { $$ = new Return($2,@1.first_line, @1.first_column); }
                        | func_graficar                                      { $$ = $1; }
                        | RBREAK ';'                                         { $$ = new Break(@1.first_line, @1.first_column); }
                        
                        | expresion '++'';'
                        | expresion '--'';'
                        ;

expresion : '-' expresion %prec UMENOS	         { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); }
          | expresion '&' expresion		         { $$ = new Operacion($1,$3,Operador.CONCATENACION, @1.first_line, @1.first_column); }	
          | expresion '^' expresion	             { $$ = new Operacion($1,$3,Operador.REPETICION, @1.first_line, @1.first_column); }	

          | expresion '+' expresion              { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }		  
          | expresion '-' expresion		         { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }		     
          | expresion '*' expresion		         { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }   
          | expresion '/' expresion	             { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); }   
          | expresion '%' expresion	             { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }   
          
          | expresion '<' expresion		         { $$ = new Operacion($1,$3,Operador.MENOR_QUE, @1.first_line, @1.first_column); }
          | expresion '>' expresion		         { $$ = new Operacion($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }
          | expresion '<=' expresion	         { $$ = new Operacion($1,$3,Operador.MENOR_IGUA_QUE, @1.first_line, @1.first_column); }
          | expresion '>=' expresion	         { $$ = new Operacion($1,$3,Operador.MAYOR_IGUA_QUE, @1.first_line, @1.first_column); }
          | expresion '==' expresion	         { $$ = new Operacion($1,$3,Operador.IGUAL_IGUAL, @1.first_line, @1.first_column); }
          | expresion '!=' expresion             { $$ = new Operacion($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }
          
          | expresion '&&' expresion             { $$ = new Operacion($1,$3,Operador.AND, @1.first_line, @1.first_column); }
          | expresion '||' expresion             { $$ = new Operacion($1,$3,Operador.OR, @1.first_line, @1.first_column); }
          | '!' expresion	   	                 { $$ = new Operacion($2,$2,Operador.NOT, @1.first_line, @1.first_column); }
          
          | ID                                  { $$ = new AccesoVariable($1, @1.first_line, @1.first_column); }
          | ENTERO		                        { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column,true); }		    
          | DECIMAL				                { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column,false); }
          | RTRUE				                { $$ = new Primitivo(true,  this._$.first_line, this._$.first_column); }
          | RFALSE	     	                    { $$ = new Primitivo(false, this._$.first_line, this._$.first_column); }
          | CADENA	                            { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
          | CARACTER                            { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
          | RNULL                               { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
          
          | ID '[' expresion ']'                { $$ = new AccesoArreglo($1,$3, @1.first_line, @1.first_column); }

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
          | '(' expresion ')'	          	     { $$ = $2 } 
          ;
