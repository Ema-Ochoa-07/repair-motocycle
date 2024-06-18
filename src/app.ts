import { AppRouter } from "./presentation/routes"
import { Server } from "./presentation/server"


(async() =>{
    main()
})()

async function main () {
    const server = new Server({
        port:3000,
        routes: AppRouter.routes
    })
    await server.start()
}