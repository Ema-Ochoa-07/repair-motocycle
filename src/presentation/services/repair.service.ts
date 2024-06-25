import { Repair } from "../../data";
import { CreateRepairDto, CustomErrors, UpdateRepairDto } from "../../domain";

enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELlED'
}


export class RepairService{
    constructor() {}

    async createRepair(repairData: CreateRepairDto){

        try {
            const repair = new Repair()
            repair.date = repairData.date
            repair.status = Status.PENDING
            repair.user_id = repairData.userId

            await repair.save()
            return repair
        
        } catch (error) {
            console.log(error)
        }
    }

    async findRepairsAll(){
        try {
            return await Repair.find()
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
        repair.user_id = repairData.userId
  
        try {
          await repair.save() 
          return repair
        } catch (error) {
          console.log(error)
          throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
      }

      async deleteRepair(id: number){
        const repair = await this.findRepairById(id)

        repair.status = Status.CANCELLED

        try {
            await repair.save()
            return repair
        } catch (error) {
            throw CustomErrors.internalServer('Internal Server Error 🧨')
        }
      }
}