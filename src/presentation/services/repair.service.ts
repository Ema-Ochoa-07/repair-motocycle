import { In } from "typeorm";
import { Repair } from "../../data";
import { CreateRepairDto, CustomErrors, UpdateRepairDto } from "../../domain";
import { UserService } from "./user.service";
import { protectAccountOwner } from "../../config/validate-owner";

enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELlED'
}


export class RepairService{
    constructor(
        private readonly userService: UserService
    ) {}

    async createRepair(repairData: CreateRepairDto){

        const userPromise = this.userService.getProfileUser( repairData.userId)
        const  [userArrPromisse] = await Promise.all([userPromise])

        const repair = new Repair()
        repair.date = repairData.date
        repair.status = Status.PENDING
        // repair.user_id = repairData.userId 
        repair.user = userArrPromisse

        try {
            await repair.save()
            return repair
        
        } catch (error) {
            console.log(error)
        }
    }

    async findRepairsAll(){
        try {
            return await Repair.find({
                where: { 
                    // status: In([Status.PENDING, Status.COMPLETED]) 
                    status: Status.PENDING  
                    },
                    relations:['user'],
                    select:{
                        user:{
                            id: true,
                            email: true
                        }
                    }
                })
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }

    async findRepairById(id: number){
        try {
            const repair =  await Repair.findOne({
                where:{
                    id: id,
                    status: Status.PENDING  
                }
            })

            if(!repair){
                throw CustomErrors.notFound(`User with id ${id} not found`)
            }
            return repair

        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
    }


    async updateRepair(repairData: UpdateRepairDto, id: number){
        const repair = await this.findRepairById(id)
  
        repair.date = repairData.date
        repair.status = Status.PENDING
  
        try {
          await repair.save() 
          return repair
        } catch (error) {
          console.log(error)
          throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
      }

      async deleteRepair(id: number, userSessionId: number){
        const repair = await this.findRepairById(id)

        const isOwner = protectAccountOwner(repair.user.id, userSessionId)
        if(!isOwner)  throw CustomErrors.unAuthorized('You are not owner of this repair')

        repair.status = Status.CANCELLED

        try {
            await repair.save()
            return repair
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
      }
}