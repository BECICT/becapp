import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    fullname: string

    @Column({unique: true})
    email:string

    @Column()
    password: string

    @Column({default: true})
    firstlogin: boolean

    @Column()
    failedloginAttempt: number

    @CreateDateColumn({name: 'CreatedOn', default: new Date()})
    CreatedOn: Date;

    @UpdateDateColumn({name: 'UpdatedOn', default: new Date(), nullable: true})
    UpdatedOn: Date;

}