import { Router } from "express";
import { UsersRoutes } from "../entity/users/routes";
import { RepairsRoutes } from "../entity/repairs/routes";

export class AppRouter{


    static get routes(): Router{

        const router = Router()

        router.use('/api/v1/users', UsersRoutes.routes)
        router.use('/api/v1/repairs', RepairsRoutes.routes)

        return router
    }

}