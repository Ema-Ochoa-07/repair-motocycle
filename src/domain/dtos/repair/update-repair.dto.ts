
enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELlED'
}

export class UpdateRepairDto{

    private constructor(        
        public readonly date: Date,
        public readonly status: Status.PENDING,
        public readonly userId: number
    ){}

    static update(object: {[key: string] : any}): [string?, UpdateRepairDto?]{
        const { date, status, userId } = object

        if(!date) return ['Missing date']
        if(!status) return ['Missing date']
        if(!userId) return ['Missing date']

        return [undefined, new UpdateRepairDto(date, status, userId)]
    }
}