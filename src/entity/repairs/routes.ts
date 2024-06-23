import { Router } from "express";
import { RepairController } from "./controller";
import { RepairService } from "../../presentation/services/repair.service";

export class RepairsRoutes{

    static get routes(): Router{

        const router = Router()

        const repairService = new RepairService()
        const controller = new RepairController(repairService)

        router.post('/', controller.createRepair)
        router.get('/', controller.getRepair)
        router.get('/:id', controller.getRepairById)
        router.patch('/:id', controller.updateRepair)
        router.delete('/:id', controller.deleteRepair)


        return router
    }
}

