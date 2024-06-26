import { User } from "../../data";
import { CustomErrors, RegisterUserDto, UpdateUserDto } from "../../domain";

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class UserService{
    constructor(){}

    async registerUser(userData: RegisterUserDto){
        
        try {
            const user =  new User()
            user.name = userData.name.trim()
            user.email = userData.email.toLowerCase().trim()
            user.password = userData.password.trim() 
            
            await user.save()
            return user
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