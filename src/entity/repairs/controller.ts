import { Request, Response, response } from "express"


export class UserController {
    constructor(){}

    createUser = (req: Request, res:Response) =>{
        const { id, date, status } = req.body
        return res.status(201).json({ id, date, status})
    }

    getUser = (req:Request, res: Response) =>{

    }
}