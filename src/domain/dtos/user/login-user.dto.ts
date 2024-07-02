import { regularExps } from "../../../config"



export class LoginUserDto{
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static create(object: {[key:string] :any}) : [string?, LoginUserDto?]{
     const {name, password} = object
     if(!name) return ['Missing name', undefined]
     if(!password) return ['Missing password']


     return [undefined, new LoginUserDto(name, password)]
    }
}