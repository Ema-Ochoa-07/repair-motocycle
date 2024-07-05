import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { User } from "../../data";

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class AuthMiddleware{
      
    static async protect(req: Request, res: Response, next: NextFunction){
        
        const authorization = req.header('Authorization')
        if(!authorization) return res.status(401).json({message: 'No token provided'})
        
        if(!authorization.startsWith('Bearer')) return res.status(401).json({message: 'Invalid token'})
       
        const token = authorization.split(' ').at(1) || ''
        console.log(token)

        try {
            
            const payload = await JwtAdapter.validateToken<{ id: number }>(token)
            // console.log("PUNTO A:", payload)
            if(!payload) return res.status(401).json({message: 'Invalid token'})
                // console.log("Punto B:", payload)            
                const user = await User.findOne({
                    where:{
                        id: payload.id,
                        status: Status.ACTIVE,
                        emailValidated: true
                    }                    
                })
                if(!user) return res.status(401).json({message:'Invalid user'})
                
                // Tener en cuenta si se va a cambiar contraseña- validar los tiempos

                next()

        } catch (error) {
            return res.status(500).json({message: 'Internal server error'})
        }
    }

}

