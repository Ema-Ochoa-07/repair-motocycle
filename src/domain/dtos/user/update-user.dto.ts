

export class UpdateUserDto{
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ){}

    static update(object: {[key:string] :any}) : [string?, UpdateUserDto?]{
     const {name, email, password} = object
     if(!name) return ['Missing name', undefined]
     if(!email) return ['Missing email']
     if(!password) return ['Missing password']

     return [undefined, new UpdateUserDto(name, email, password)]
    }
}