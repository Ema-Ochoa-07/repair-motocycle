

export class UpdateUserDto{
    constructor(
        public readonly name: string,
        public readonly email: string,
    ){}

    static update(object: {[key:string] :any}) : [string?, UpdateUserDto?]{
     const {name, email} = object
     if(!name) return ['Missing name', undefined]
     if(!email) return ['Missing email']

     return [undefined, new UpdateUserDto(name, email)]
    }
}