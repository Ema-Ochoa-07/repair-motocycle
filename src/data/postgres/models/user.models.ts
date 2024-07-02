import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { bcryptAdapter } from "../../../config";

enum Role{
    CLIENT =  'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
}

enum Status{
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false,
        length:100

    })
    name: string

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length:150
    })
    email: string
    

    @Column({
        type: 'varchar',
        nullable: false,
        length:255
    })
    password: string

    @Column({
        type: 'enum',
        unique: false,
        enum: Role,
        default: Role.CLIENT

    })
    role: Role


    @Column({
        type: 'enum',
        nullable: true,
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status


    
    @Column({
        type: 'boolean',
        default: false
    })
    emailValidated: boolean

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date

    // @BeforeInsert()
    // encriptPassword(){
    //     console.log(this.password)
    //     // this.password = bcryptAdapter.hash()  
    // }

}