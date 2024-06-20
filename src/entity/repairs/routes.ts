import { Router } from "express";
import { RepairController } from "./controller";

export class RepairsRoutes{

    static get routes(): Router{

        const router = Router()

        const controller = new RepairController()

        router.post('/', controller.createRepair)
        router.get('/', controller.getRepair)
        router.get('/:id', controller.getRepairById)
        router.patch('/:id', controller.updateRepair)
        router.delete('/:id', controller.deleteRepair)


        return router
    }
}

