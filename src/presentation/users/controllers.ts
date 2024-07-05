import { Request, Response } from "express"
import { UserService } from "../services/user.service"
import { error } from "console"
import {CreateUserDto, CustomErrors, UpdateUserDto } from "../../domain"
import { threadId } from "worker_threads"
import { LoginUserDto } from "../../domain/dtos/user/login-user.dto"

export class UserController{
    constructor( 
        public readonly userService : UserService
     ){}

        //LOGIN
        login = async (req: Request, res: Response) =>{
            const [error, loginUserDto ] = LoginUserDto.create(req.body)

            if(error) return res.status(422).json({message: error})
            
                this.userService.loginEmail(loginUserDto!)
                .then((data) =>{
                    return res.status(200).json(data)
                })
                .catch((error) => {
                    return res.status(500).json(error)
                })

    }


     // REPEAT ERROR METHOD 
     private handleError = (error:any, res: Response) =>{
        console.log(error)
            if(error instanceof CustomErrors){
                return res.status(error.statusError).json({message: error.message})
            }
            return res.status(500).json({message: 'Internal server Error'})
    }


    //CRUD
    createUser = (req:Request, res:Response) => {
        // const {name, email, password} = req.body
        const  [error, createUserDto] = CreateUserDto.create(req.body)
        if(error) return res.status(422).json({message: error})
        // this.userService.createUser({ name, email, password })
        this.userService.createUser( createUserDto! )

        .then(user =>{
            return res.status(200).json(user)
        })
        .catch((error) => this.handleError(error, res))        
    }

    
    validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;
    
        this.userService.validateEmail( token )
            .then(() => res.json('Email was validated properly'))
            .catch(error => this.handleError(error, res))
      }

    getUser = (req:Request, res:Response) => {
        this.userService.findAllUser()
        .then(user =>{
            return res.status(200).json(user)
        })
        .catch((error) => this.handleError(error, res))
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
        .catch((error) => this.handleError(error, res))
    }

    updateUser = (req:Request, res:Response) =>{
        const { id } = req.params
        const [error, updateUserDto] = UpdateUserDto.update(req.body)
        if(error) return res.status(422).json({message: error})

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        this.userService.updateUser(updateUserDto!, +id)
        .then(user =>{
            return res.status(200).json(user)
        })   
        .catch((error) => this.handleError(error, res))      
    }

    deleteUser = (req:Request, res:Response) =>{
        const { id } = req.params
        
        if(isNaN(+id)){
            if(error instanceof CustomErrors){
                return res.status(error.statusError).json({message: error.message})
            }
            return res.status(500).json(error)
        }
        
        this.userService.deleteUser(+id)
        .then(user =>{
            return res.status(200).json(user)
        })
        .catch((error) => this.handleError(error, res))
    }

}