import { join } from "path/posix";
import { Member } from "src/member/entities/member.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Contact extends RecurrentBaseEntity {

    @Column()
    Address1: string;

    @Column({nullable: true})
    Address2: string;

    @Column()
    PrimaryPhoneNo: string;

    @Column({nullable: true})
    OtherPhoneNo: string;

    @Column()
    EmailAddress: string;

    @OneToOne(() => Member)
    @JoinColumn()
    member:Member;
}
