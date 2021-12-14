import { Error } from "./Error";

export class ReporteErrores{
    
    private static instance: ReporteErrores;
    public errores:Array<Error> = []
    
    private constructor(){
        
    }

    public static getInstance(): ReporteErrores {
        if (!ReporteErrores.instance) {
            ReporteErrores.instance = new ReporteErrores();
        }

        return ReporteErrores.instance;
    }

    getErrores(){
        return this.errores;
    }
    
    pushError(error:Error){
        this.errores.push(error);
    }

}