import { Router } from "express";
import { UserController } from "./controllers";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

export class UsersRoutes{

    static get routes():Router{

        const router = Router()

        // const repairservice =  new RepairService()
        const emailservice = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )
        const userservice = new UserService(emailservice)
        const controller = new UserController(userservice)

        router.post('/login', controller.login)
        router.post('/', controller.createUser)

        router.get('/', controller.getUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUser)
        router.delete('/:id', controller.deleteUser)

        router.get('/validator-email/:token', controller.validateEmail)


        return router      
        
    }
}