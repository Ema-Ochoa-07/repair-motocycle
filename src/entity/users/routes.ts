import { Router } from "express";
import { UserController } from "./controllers";

export class UsersRoutes{

    static get routes():Router{

        const router = Router()

        const controller = new UserController()

        router.post('/', controller.createUser)
        router.get('/', controller.getUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUser)
        router.delete('/:id', controller.deleteUser)

        return router      
        
    }
}