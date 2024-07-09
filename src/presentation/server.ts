import express, { Router } from 'express'
import cors from 'cors'
import helmet from "helmet";
import { CallTracker } from 'assert';
// import

interface Options{
    port:number
    routes: Router
}

export class Server {
    public readonly app = express()
    private readonly port: number
    private readonly routes: Router
    private readonly aceptedOrigin: string[] = ['http://localhost:5173']

    constructor(options: Options){
        this.port = options.port
        this.routes = options.routes
    }

    async start(){
        //*Utilizar el Middelware Use
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )
        this.app.use( cors ({
            origin: (origin, callback) => {

                if(!origin){
                    return callback(null, true)
                }

                if(this.aceptedOrigin.includes(origin!)){
                    return callback(null, true)
                }
                return callback( new Error ('Not allowed by CORS'))
            }
        }))
        this.app.use( helmet() ) // otras medidas de seguridad en los headers
        // app.use(hpp())

        this.app.use(this.routes)

        this.app.listen(this.port, () =>{
            console.log(`Server is running on port ${this.port} ✔`)
        })
    }
}