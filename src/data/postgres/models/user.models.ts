import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { bcryptAdapter } from "../../../config";
import { Repair } from "./repair.models";

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
        default: false,
    })
    emailValidated: boolean


    @Column({
        type: 'varchar',
        nullable: false,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.es%2Ficono-gratis%2Fperfil-del-usuario_6326055&psig=AOvVaw2B39i0Gsqq54ZBfOOE_-2c&ust=1720666323554000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLias9m7m4cDFQAAAAAdAAAAABAE',
        length: 255
    })
    avatar: string


    @OneToMany(() => Repair, (repair) => repair.user )
    repairs: Repair[]


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