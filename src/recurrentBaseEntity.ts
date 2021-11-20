import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class RecurrentBaseEntity{
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @CreateDateColumn({name: 'CreatedOn', default: new Date()})
    CreatedOn: Date;

    @UpdateDateColumn({name: 'UpdatedOn', default: new Date(), nullable: true})
    UpdatedOn: Date;

    @Column({nullable: true})
    CreatedBy: string;

    @Column({nullable: true})
    UpdateBy: string
}