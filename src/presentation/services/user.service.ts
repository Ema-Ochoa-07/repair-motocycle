import { User } from "../../data";

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class UserService{
    constructor(){}

    async createUser(userData: any){
        
        try {
            const user =  new User()
            user.name = userData.name.trim()
            user.email = userData.email.toLowerCase().trim()
            user.password = userData.password.trim() 
            
            await user.save()
            return user
        } catch (error) {
            console.log(error)
        }
    }


    async findAllUser(){
        try {
            return await User.find()
        } catch (error) {
            console.log(error)
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
                throw new Error('No existe usuario con ese id')
            }
            return user
            
        } catch (error) {
            throw new Error('Internal server error')
            console.log(error)
        }
    }

    
    async updateUser(userData: any, id: number){
        const user = await this.findUserById(id)
  
        user.name = userData.name.trim()    
        user.email = userData.email.toLowerCase().trim()
        user.password = userData.password.trim()   
  
        try {
          await user.save() 
          return user
        } catch (error) {
          console.log(error)
          throw new Error ('Internal Server Error')
        }
      }

    async deleteUser(id:number){
        const user = await this.findUserById(id)

        user.status = Status.INACTIVE

        try {
            await user.save()
            return user
        } catch (error) {
            throw new Error('Internal Server Error')
        }
    }
}