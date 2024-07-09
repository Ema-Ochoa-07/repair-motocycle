import express, { Router } from 'express'
import cors from 'cors'
import helmet from "helmet";
// import

interface Options{
    port:number
    routes: Router
}

export class Server {
    public readonly app = express()
    private readonly port: number
    private readonly routes: Router

    constructor(options: Options){
        this.port = options.port
        this.routes = options.routes
    }

    async start(){
        //*Utilizar el Middelware Use
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )
        this.app.use( cors ) //Medida de seguridadd que otros sitios accedan al servidor
        this.app.use( helmet() ) // otras medidas de seguridad en los headers
        // app.use(hpp())

        this.app.use(this.routes)

        this.app.listen(this.port, () =>{
            console.log(`Server is running on port ${this.port} ✔`)
        })
    }
}