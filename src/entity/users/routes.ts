import { Router } from "express";
import { UserController } from "./controllers";
import { UserService } from "../../presentation/services/user.service";
import { RepairService } from "../../presentation/services/repair.service";

export class UsersRoutes{

    static get routes():Router{

        const router = Router()

        // const repairservice =  new RepairService()
        const userservice = new UserService()
        const controller = new UserController(userservice)

        router.post('/', controller.createUser)
        router.get('/', controller.getUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUser)
        router.delete('/:id', controller.deleteUser)

        return router      
        
    }
}