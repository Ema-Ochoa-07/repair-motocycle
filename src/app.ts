import "reflect-metadata"
import { AppRouter } from "./presentation/routes"
import { Server } from "./presentation/server"
import { PostgresDatabase } from "./data"


(async() =>{
    main()
})()

async function main () {

        const postgres = new PostgresDatabase({
        host: 'ep-white-boat-a5qxd7kj.us-east-2.aws.neon.tech',
        port:5432,
        username: 'repairmotodb_owner',
        password: 'T7Nd4RkZyHPU',
        database: 'repairmotodb'

    })

    await postgres.connect()

    const server = new Server({
        port:3001,
        routes: AppRouter.routes
    })
    await server.start()
}