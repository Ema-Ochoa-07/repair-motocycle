import { Request, Response } from "express";


export class RepairController{

constructor(){}

    createRepair = (req:Request, res: Response) => {
        const { id, date, status } = req.body
        return res.status(201).json({ id, date, status }) 
    }

    
    getRepair = ( req:Request, res:Response ) =>{
        return res.status(200).json({ message: `List Repairs` })
    }

    getRepairById = (req:Request, res:Response) => {
        const { id } = req.params
        return res.status(200).json({ message: `The reapir with id ${id} was found`})
    }

    updateRepair = (req:Request, res:Response) =>{
        const { id, date, status } = req.params
        return res.status(200).json({ message: `The repair with id ${id} was change` })
    }

    deleteRepair = (req:Request, res:Response) =>{
        const { id } = req.params
        return res.status(500).json()
    }

}