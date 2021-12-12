%lex

%%

\s+                                         /* skip whitespace */
"//".*                                      //'.*      /* skip comment */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         /* IGNORE */

//RESERVADAS

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


%rigth '?'
%left '||' 
%left '&&' 
%left '<' '<=' '>' '>=' '==' '!='
%left '+' '-' '&'
%left '*' '/' '%'
%left UMENOS
%right '!'
%right '++' '--'

%start inicio

%% /* Definición de la gramática */

inicio
    : instrucciones EOF                 {return new AST($1);}       
;

instrucciones
    : instrucciones instruccion         { $1.push($2); $$ = $1;}
    | instruccion                       { $$ = [$1]; }   
;

instruccion
    : declaracion
    | asignacion
    | impresion                          { $$ = $1 }
    | funciones
;

declaracion : tipo ID '=' expresion ';'
            | tipo lista_declaracion ';'
            | RSTRUCT ID '{' lista_atributos'}' ';'
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

asignacion : ID '=' expresion ';'
           | ID ID '=' ID '(' lista_parametros ')' ';'
           ;

tipo        : tipo_primitivo
;

tipo_primitivo :    RINT
               |    RDOUBLE
               |    RSTRING
               |    RBOOLEAN
               |    RCHAR
;                    

impresion       : RPRINTLN '(' lista_impresion ')' ';'
                | RPRINT '(' expresion ')' ';'            { $$ = new Print($3, @1.first_line, @1.first_column); }
;

lista_impresion : lista_impresion ',' expresion                 { $1.push($2); $$ = $1;}
                | expresion                                     { $$ = [$1]; }
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

                       ; 

cond_switch     : RSWITCH '(' expresion ')' '{' bloque_switch '}'
                ;

bloque_switch   : bloque_switch estructura_case
                | estructura_case
                ;

estructura_case : RCASE expresion ':' instrucciones_dentro
                | RDEFAULT expresion ':' instrucciones_dentro
                ;

funciones       : ID ID '(' ')' '{' instrucciones_dentro '}' 
                | ID ID '(' lista_atributos')' '{'instrucciones_dentro '}' 
                ;


tipo_func_arit       : RPOW
                     | RSQRT
                     | RSIN
                     | RCOS
                     | RTAN
;                

func_arit          : tipo_func_arit '(' expresion ')'
;

instrucciones_dentro : instrucciones_dentro instruccion_dentro
                     | instrucciones_dentro
                    ;

instruccion_dentro      : declaracion
                        | asignacion                    
                        | impresion
                        | llamada ';'
                        | cond_if
                        | cond_switch
                        | RRETURN ';'
                        | RRETURN expresion ';'
                        ;

expresion : '-' expresion %prec UMENOS	 
          | expresion '&' expresion		  
          | expresion '+' expresion              { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }		  
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
          | ENTERO		                        { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column); }		    
          | DECIMAL				    
          | RTRUE				
          | RFALSE	     		
          | CADENA	 
          | CARACTER
          | RNULL  
          
          | expresion '++'
          | expresion '--'       
          | llamada 
          | nativas
          | func_arit
          | '(' expresion ')'	          	
          ;
