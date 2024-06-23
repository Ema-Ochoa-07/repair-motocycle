import { Request, Response } from "express";
import { RepairService } from "../../presentation/services/repair.service";
import { json } from "stream/consumers";
import { error } from "console";


export class RepairController{

constructor(
    public readonly repairService: RepairService
){}

    createRepair = (req:Request, res: Response) => {
        const { date, userId} = req.body

        this.repairService.createRepair({ date, userId })
        .then(repair => {
            return res.status(201).json(repair) 
        })
        .catch((error: any) =>{
            return res.status(500).json(error)
        })
        
    }

    
    getRepair = ( req:Request, res:Response ) =>{
        this.repairService.findRepairsAll()
          .then(repair => {
              return res.status(200).json(repair)
          })
          .catch(error => {
            return res.status(500).json(error)
          })
    }

    getRepairById = (req:Request, res:Response) => {
        const { id } = req.params
        if(isNaN(+id)){
            return res.status(400).json({ message: 'El id debe ser un número' })
        }
        this.repairService.findRepairById(+id)
        .then(repair => {
            return res.status(200).json(repair)
        })
        .catch(error => {
            return res.status(500).json(error)
        })

    }

    updateRepair = (req:Request, res:Response) =>{
        const { id } = req.params
        const { date } = req.body

        if(isNaN(+id)){
            return res.status(200).json({message: 'El id debe ser un número'})
        }

        this.repairService.updateRepair({ date }, +id)
        .then(repair => {
            return res.status(200).json(repair)
        })
        .catch(error => {
            return res.status(500).json(error)
        })

    }

    deleteRepair = (req:Request, res:Response) =>{
        const { id } = req.params
        
        if(isNaN(+id)){
            return res.status(400).json('El id debe ser un número')
        }
        
        this.repairService.deleteRepair(+id)
        .then(repair =>{
            return res.status(200).json(repair)
        })
        .catch(error => {
            return res.status(500).json('Internal Server Error')
        })
    }

}