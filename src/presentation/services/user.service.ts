import { Subject } from "typeorm/persistence/Subject";
import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { User } from "../../data";
import { CreateUserDto, CustomErrors, UpdateUserDto } from "../../domain";
import { EmailService } from "./email.service";
import { LoginUserDto } from "../../domain/dtos/user/login-user.dto";

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class UserService{
    constructor(
        private readonly emailservice: EmailService
    ){}

    async createUser(createUserDto: CreateUserDto){

        const exitsUser = await User.findOne({
            where:{
                email: createUserDto.email,
                status: Status.ACTIVE
            }            
        })
        if(exitsUser)
            throw CustomErrors.badRequest('Email already exit')  
        
        const user =  new User()
        user.name = createUserDto.name
        user.email = createUserDto.email
        user.password = bcryptAdapter.hash(createUserDto.password)
        // user.password = createUserDto.password

        try {
                      
            await user.save()

            await this.sendEmailValidationLink(user.email)

            const token = await JwtAdapter.generateToken({ id: user.id })
            if(!token) throw CustomErrors.internalServer('Error while creating JWT')
            
            return {
                // token: token,
                user: user,
            }

        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }

     sendEmailValidationLink = async (email:string) =>{
        const token = await JwtAdapter.generateToken( {email} )
        if(!token) throw CustomErrors.internalServer('Error getting token')
            
        const link = `${envs.WEBSERVICE_URL}/users/validate-email/${token}`
        const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${ link }">Validate your email: ${email}</a>
        `
        const isSent = 
        this.emailservice.sendEmail(
            {
                to: email,
                subject: 'validate your email',
                htmlBody:html
            }
        )
        if
        (!isSent) throw CustomErrors.internalServer('Error sending email')
        return true         
    }


    validateEmail = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token)
        if(!payload) throw CustomErrors.unAuthorized('Invalid Token')

        const { email } = payload as { email:string }
        if(!email) throw CustomErrors.internalServer('Email not in token')

        const user = await User.findOne({
            where:{
                email: email
            }
        })
        if(!user) throw CustomErrors.internalServer('Email not exist')
        user.emailValidated = true
        
        try {
            await user.save()
            return true
        } catch (error) {
            throw CustomErrors.internalServer('Somenthing went very wrong')
        }
    }
    
    loginEmail = async (loginUserDto: LoginUserDto) => {
        //1 buscar el usuario que se quiere loggear

        const user = await User.findOne({
            where:{
                email: loginUserDto.email,
                status: Status.ACTIVE,
                emailValidated: true
            }
        })

        if(!user) throw CustomErrors.unAuthorized('Invalid credential')

        //2 validar si la contraseña es correcta
        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password)
        if(!isMatching) throw CustomErrors.unAuthorized("Invalid credentials")

        //3 generar el token
        const token = await JwtAdapter.generateToken({id: user.id})
        if(!token) throw CustomErrors.internalServer('Internal Server Error')

        //4 enviar la información
        return  {
            token: token,
            user:{
                id: user.id,
                email: user.email,
                role: user.role        
            }
        }

    }

    async findAllUser(){
        try {
            return await User.find()
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }

    async findUserById(id: number){
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                    status: Status.ACTIVE
                }
            })
            if(!user){
                throw CustomErrors.notFound(`User with id ${id} not found`)
            }
            return user
            
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }

    
    async updateUser(userData: UpdateUserDto, id: number){
        const user = await this.findUserById(id)
  
        user.name = userData.name.trim()    
        user.email = userData.email.toLowerCase().trim()  
  
        try {
          await user.save() 
          return user
        } catch (error) {
          console.log(error)
          throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
      }

    async deleteUser(id:number){
        const user = await this.findUserById(id)

        user.status = Status.INACTIVE

        try {
            await user.save()
            return user
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }

}