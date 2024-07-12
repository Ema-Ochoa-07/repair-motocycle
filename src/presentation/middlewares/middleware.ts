import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { User } from "../../data";


enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

enum Role{
    CLIENT =  'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
}

export class AuthMiddleware{
    
    static async protect(req: Request, res: Response, next: NextFunction){
        
        const authorization = req.header('Authorization')
        // console.log("Punto A:", authorization) 
        if(!authorization) return res.status(401).json({message: 'No token provided'})
        
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({message: 'Invalid token'})
       
        const token = authorization.split(' ').at(1) || ''

        try {            
            const payload = await JwtAdapter.validateToken<{ id: number }>(token)
            // console.log("PUNTO A:", payload)
            if(!payload) return res.status(401).json({message: 'Invalid token'}) 
            
            //Validación del usuario para ver si el usuario áun exite, PUDO AVER BORRADO LA CUENTA
                const user = await User.findOne({
                    where:{
                        id: payload.id,
                        status: Status.ACTIVE,
                        emailValidated: true,
                        // role: Role.EMPLOYEE
                    }                    
                })
                if(!user) return res.status(401).json({message:'Invalid user'})
                
                // Tener en cuenta si se va a cambiar contraseña- validar los tiempos


                req.body.sessionUser = user
                next()

        } catch (error) {
            return res.status(500).json({message: 'Internal server error'})
        }
    }

    static restrictTo = (...roles: any) => {
        return (req: Request, res: Response, next: NextFunction) =>{
            if(!roles.includes(req.body.sessionUser.role)){
                return res.status(403).json({message: 'You are not authorized to access this route'})
            }
            next()
        }   
    }
}

