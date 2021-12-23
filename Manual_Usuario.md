## Manual de Usuario


##### Proyecto 1 - Compiladores 2
##### Curso de vacaciones - Diciembre 2021 
   

- Cesar Arnoldo Tajiboy Orozco
- Luis Alfonso Mencos Salazar
---
### Quetzal

La aplicación cuenta con tres areas de texto:
- Entrada
- Interprete
- Traduccion.

El código de entrada debe cumplir con la sintaxis definida basada en java.

![Alt text](/img/a1.jpg?raw=true "Interfaz")

### Acciones
- Interpretar: al dar clic en este boton se realiza el proceso de interpretar el codigo que se ecneuntra en la entrada y mostrar el resultado en el area Interprete

![Alt text](/img/a2.jpg?raw=true "Interprete")

- Traducir: esta acción toma el código de entrada y lo traduce a codigo tres direcciones mostrando el resultado en el area Traducción.

- AST: genera el arbol de analisis sintactico del codigo de entrada.

![Alt text](/img/a4.jpg?raw=true "AST")
Una porcion del ast generado.

- Tabla de simbolos: Muestra los simbolos recolectados en el proceso de interpretación. Despliega su id, tipo, valor, linea y columna.

![Alt text](/img/a3.jpg?raw=true "Simbolos")

- Errores: Muestra a través de una tabla el listado de errores que se produjeron en el proceso de interpretación.

![Alt text](/img/a5.jpg?raw=true "Errores")