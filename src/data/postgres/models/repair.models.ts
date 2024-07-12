import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.models";

enum Status{
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELlED'
}

@Entity()
export class Repair extends BaseEntity{
    @PrimaryGeneratedColumn()
        id: number

    @Column({
        type: 'date',
        nullable: false,
    })
    date: Date

    @Column({
        nullable: true,
        enum: Status,
        default: Status.PENDING
    })
    status: Status

    @Column({
        type: 'varchar',
        array: true,
        nullable: true
    })
    imgs: string[]
    
    @ManyToOne(() => User, (user) => user.repairs)
    user: User


    // @Column({
    //     type: 'int',
    //     nullable: false
    // })
    // user_id: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date
}