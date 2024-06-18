import { Request, Response } from "express"

export class UserController{
    constructor(){}

    createUser = (req:Request, res:Response) => {
        const {id, name, email, passsword, role, status} = req.body
        return res.status(201).json({id, name, email, passsword, role, status })
    }

    getUser = (req:Request, res:Response) => {
        return res.status(200).json({ message:`List Users` })
    }

    getUserById = (req:Request, res:Response) =>{
        const { id } = req.params
        return res.status(200).json({ message:`User with id ${id} was found` })
    }

    updateUser = (req:Request, res:Response) =>{
        const { name, email, passsword, role, status} = req.body
        const { id } = req.params
        return res.status(200).json({ message:`User with id ${id} was change` })
    }

    deleteUser = (req:Request, res: Response) => {
        const { id } = req.params
        return res.status(204).json()
    }
}