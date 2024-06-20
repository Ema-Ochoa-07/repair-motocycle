import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Status{
    ACTVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
        length:80
    })
    name: string

    @Column({
        unique: false,
        nullable: false,
        length:100
    })
    email: string
    

    @Column({
        unique: false,
        nullable: false,
        length:50
    })
    password: string


    @Column({
        nullable: true,
        enum: Status,
        default: Status.ACTVE
    })
    status: Status


    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date
}