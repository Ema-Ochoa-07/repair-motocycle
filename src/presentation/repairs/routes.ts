import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../services/repair.service";
import { AuthMiddleware } from "../middlewares/middleware";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

export class RepairsRoutes{

    static get routes(): Router{

        const router = Router()
        
        const emailService =  new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )
        const userService = new UserService(emailService)
        const repairService = new RepairService(userService)
        const controller = new RepairController(repairService)

        router.use(AuthMiddleware.protect)

        router.post('/', controller.createRepair)
        router.get('/', controller.getRepair)
        router.get('/:id', controller.getRepairById)
        router.patch('/:id', controller.updateRepair)
        router.delete('/:id', controller.deleteRepair)


        return router
    }
}

