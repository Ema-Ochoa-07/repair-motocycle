import "reflect-metadata"
import { AppRouter } from "./presentation/routes"
import { Server } from "./presentation/server"
import { PostgresDatabase } from "./data"


(async() =>{
    main()
})()

async function main () {

    //CAMBIAR POR LA NUEVA BD

    const postgres = new PostgresDatabase({
        host: 'ep-steep-limit-a55j8wuz.us-east-2.aws.neon.tech',
        port:5432,
        username: 'videogamedb_owner',
        password: 'okpN4EvH8yzn',
        database: 'videogamedb'

    })

    await postgres.connect()

    const server = new Server({
        port:3000,
        routes: AppRouter.routes
    })
    await server.start()
}