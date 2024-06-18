import { Router } from "express";
import { UsersRoutes } from "../entity/users/routes";

export class AppRouter{


    static get routes(): Router{

        const router = Router()

        router.use('/api/v1/users', UsersRoutes.routes)

        return router
    }

}