
enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELlED'
}

export class CreateRepairDto{

    private constructor(        
        public readonly date: Date,
        public readonly status: Status.PENDING,
        public readonly userId: number
    ){}

    static create(object: {[key: string] : any}): [string?, CreateRepairDto?]{
        const { date, status, userId } = object

        if(!date) return ['Missing date']
        if(!status) return ['Missing date']
        if(!userId) return ['Missing date']

        return [undefined, new CreateRepairDto(date, status, userId)]
    }
}