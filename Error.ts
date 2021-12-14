export class Error{
    public tipo: string;
    public descripcion: string;    
    linea: number;
    columna: number;

    constructor(tipo:string, descripcion:string, linea:number, columna:number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;        
    }
    
}