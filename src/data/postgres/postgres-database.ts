import { DataSource } from "typeorm";
import { User } from "./models/user.models";

interface Options {
    host: string
    port: number
    username: string
    password:string
    database:string
}

export class PostgresDatabase{

    private datasource: DataSource

    constructor(option: Options){
        this.datasource = new DataSource({
            type:'postgres',
            host: option.host,
            port: option.port,
            username: option.username,
            password: option.password,
            database: option.database,
            entities: [User],
            synchronize: true,
            ssl:{
                rejectUnauthorized: false
            }
        })
    } 

    async connect(){
        try {
            await this.datasource.initialize()
            console.log('Connected to database 👌')
            
        } catch (error) {
            console.log(error)
        }
    }

}

