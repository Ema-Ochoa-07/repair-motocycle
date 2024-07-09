import { Request, Response } from "express";
import { RepairService } from "../services/repair.service";
import { json } from "stream/consumers";
import { error } from "console";
import { CreateRepairDto, CustomErrors, UpdateRepairDto } from "../../domain";


export class RepairController{

constructor(
    public readonly repairService: RepairService
){}


     private handleError = (error:any, res: Response) =>{
        console.log(error)
            if(error instanceof CustomErrors){
                return res.status(error.statusError).json({message: error.message})
            }
            return res.status(500).json({message: 'Internal server Error'})
    }   


    createRepair = (req:Request, res: Response) => {
        // const { date, userId} = req.body
        const [error, createRepairDto] = CreateRepairDto.create(req.body)
        if (error) return res.status(422).json({message: error})

        this.repairService.createRepair(createRepairDto!)
        .then(repair => {
            return res.status(201).json(repair) 
        })
        .catch((error) => this.handleError(error, res))
        
    }

    
    getRepair = ( req:Request, res:Response ) =>{
        this.repairService.findRepairsAll()
          .then(repair => {
              return res.status(200).json(repair)
          })
          .catch((error) => this.handleError(error, res))

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
        .catch((error) => this.handleError(error, res))
    }

    updateRepair = (req:Request, res:Response) =>{
        const { id } = req.params
        const [error, updateRepairDto] = UpdateRepairDto.update(req.body)
        if(error) return res.status(422).json({message: error})            

        if(isNaN(+id)){
            return res.status(200).json({message: 'El id debe ser un número'})
        }

        this.repairService.updateRepair( updateRepairDto!, +id)
        .then(repair => {
            return res.status(200).json(repair)
        })
        .catch((error) => this.handleError(error, res))
    }

    deleteRepair = (req:Request, res:Response) =>{
        const { id } = req.params
        const idSession = req.body.sessionUser.id
        
        if(isNaN(+id)){
            return res.status(400).json('El id debe ser un número')
        }
        
        this.repairService.deleteRepair(+id, idSession)
        .then(repair =>{
            return res.status(200).json(repair)
        })
        .catch((error) => this.handleError(error, res))
    }

}