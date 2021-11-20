import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Subunit } from "src/subunit/entities/subunit.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Member extends RecurrentBaseEntity {
   
    @Column({unique: true})
    Tag_No: string;

    @Column({nullable: true})
    PhotoUrl: string;

    @Column()
    Title: string;

    @Column()
    Surname:string;

    @Column()
    Firstname:string;

    @Column()
    Othername:string;

    @Column()
    Birthdate:Date;

    @Column()
    Gender:string;

    @Column()
    Maritalstatus:string;

    @Column()
    Nextofkin:string;

    @Column()
    PhoneNoOfNextOfKin:string;

    @Column()
    MembershipStatus:string;

    @Column()
    SubunitId: string;

    @ManyToOne(() => Subunit, s => s.Member)
    Subunit: Subunit
}
