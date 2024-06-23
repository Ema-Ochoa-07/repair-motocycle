import { Repair } from "../../data";

enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELlED'
}


export class RepairService{
    constructor() {}

    async createRepair(repairData: any){

        try {
            const repair = new Repair()
            repair.date = new repairData.date
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
            console.log(error)
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
                throw new Error('No existes reparación con ese id')
            }
            return repair

        } catch (error) {
            throw new Error('Internal Server Error')
            console.log(error)
        }
    }


    async updateRepair(repairData: any, id: number){
        const repair = await this.findRepairById(id)
  
        repair.date = new repairData.date
  
        try {
          await repair.save() 
          return repair
        } catch (error) {
          console.log(error)
          throw new Error ('Internal Server Error')
        }
      }

      async deleteRepair(id: number){
        const repair = await this.findRepairById(id)

        repair.status = Status.PENDING

        try {
            await repair.save()
            return repair
        } catch (error) {
            throw new Error('Internal Server Error')
        }
      }
}