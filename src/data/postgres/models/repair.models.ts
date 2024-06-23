import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        type: 'int',
        nullable: false
    })
    user_id: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date
}