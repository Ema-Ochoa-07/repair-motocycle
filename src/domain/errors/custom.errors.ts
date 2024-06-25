

export class CustomErrors extends Error{

    constructor(
        public readonly message: string,
        public readonly statusError:number
    ){
        super(message)
    }

    static badRequest(message:string){
        return new CustomErrors(message, 400)
    }
    static unAuthorized(message:string){
        return new CustomErrors(message, 401)
    }
    static notFound(message:string){
        return new CustomErrors(message, 404)
    }
    static internalServer(message:string){
        return new CustomErrors(message, 500)
    }
}