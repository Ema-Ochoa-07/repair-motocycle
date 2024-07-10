import { Router } from "express";
import { UserController } from "./controllers";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/middleware";
import { uploadSingle } from "../../config/upload-file.adapter";

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
        
        router.post('/', controller.createUser)       
        router.post('/login', uploadSingle('avatar'),  controller.login)

        router.get('/', controller.getUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUser)
        router.delete('/:id', controller.deleteUser)

        router.get('/validate-email/:token', controller.validateEmail)

        
        router.use(AuthMiddleware.protect)
        router.get('/profile', controller.getProfileUser)


        return router      
        
    }
}