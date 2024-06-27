import { bcryptAdapter } from "../../config";
import { User } from "../../data";
import { CreateUserDto, CustomErrors, UpdateUserDto } from "../../domain";

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class UserService{
    constructor(){}

    async createUser(createUserDto: CreateUserDto){

        const exitsUser = await User.findOne({
            where:{
                email: createUserDto.email,
                status: Status.ACTIVE
            }            
        })
        if(exitsUser)
            throw CustomErrors.badRequest('Email already exit')       
        try {
            const user =  new User()
            user.name = createUserDto.name
            user.email = createUserDto.email
            user.password = bcryptAdapter.hash(createUserDto.password)
            
            return await user.save()
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }


    async findAllUser(){
        try {
            return await User. find()
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