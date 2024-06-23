import { Request, Response } from "express"
import { UserService } from "../../presentation/services/user.service"
import { error } from "console"

export class UserController{
    constructor( 
        public readonly userService : UserService
     ){}

    createUser = (req:Request, res:Response) => {
        const {name, email, password} = req.body
        this.userService.createUser({ name, email, password})
        .then(user =>{
            return res.status(201).json({name, email, password})
        }).catch((error:any) => {
            return res.status(500).json(error)
        })

        
    }

    getUser = (req:Request, res:Response) => {
        this.userService.findAllUser()
        .then(user =>{
            return res.status(200).json(user)
        })
        .catch((error: any)  => {
            return res.status(500).json(error)
        })
    }

    getUserById = (req:Request, res:Response) =>{
        const { id } = req.params
        if(isNaN(+id)){
            return res.status(400).json({ message:'EL id debe ser un número' })
        }
        this.userService.findUserById(+id)
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(error =>{
            return res.status(500).json(error)
        })
    }

    updateUser = (req:Request, res:Response) =>{
        const { id } = req.params
        const {name, role, email, password} = req.body

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        this.userService.updateUser({name, email, password}, +id)
        .then(user =>{
            return res.status(200).json(user)
        })   
        .catch(error =>{
            return res.status(400).json(error)
        })      
    }

    deleteUser = (req:Request, res:Response) =>{
        const { id } = req.params
        
        if(isNaN(+id)){
            return res.status(400).json('El id debe ser un número')
        }
        
        this.userService.deleteUser(+id)
        .then(user =>{
            return res.status(200).json(user)
        })
        .catch(error => {
            return res.status(500).json('Internal Server Error')
        })
    }
}