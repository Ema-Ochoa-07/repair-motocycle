import { regularExps } from "../../../config"



export class CreateUserDto{
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ){}

    static create(object: {[key:string] :any}) : [string?, CreateUserDto?]{
     const {name, email, password} = object
     if(!name) return ['Missing name', undefined]
     if(!email) return ['Missing email']
     if(!password) return ['Missing password']
     if(!regularExps.email.test(email)) return['Invalid email']
     if(!regularExps.password.test(password)) return [` The password must be at leaste 10 characters long and contain at
        least one uppercase LimitOnUpdateNotSupportedError, one lowercase letter, one number, and one special character `]

     return [undefined, new CreateUserDto(name, email, password)]
    }
}