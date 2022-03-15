import { Contact } from "src/contact/entities/contact.entity";
import { Employment } from "src/employment/entities/employment.entity";
import { Extra } from "src/extra/entities/extra.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Subunit } from "src/subunit/entities/subunit.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToOne(() => Profile, p => p.member, {onDelete: 'CASCADE'})
    profile: Profile

    @OneToOne(() => Contact, {cascade: true})
    @JoinColumn()
    contact: Contact

    @OneToOne(() => Employment, {cascade: true})
    @JoinColumn()
    employment: Employment

    @OneToOne(() => Extra, {cascade: true})
    @JoinColumn()
    extra: Extra
}
