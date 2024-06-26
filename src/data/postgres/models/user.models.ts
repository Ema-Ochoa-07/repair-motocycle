import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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


    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date
}