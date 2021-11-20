import { Member } from "src/member/entities/member.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Extra extends RecurrentBaseEntity {

    @Column()
    EducationalQualification: string

    @Column({nullable: true})
    Student: string

    @Column({nullable: true})
    NameOfSchool: string

    @Column({nullable: false})
    Level: string

    @OneToOne(() => Member)
    @JoinColumn()
    member:Member;
}
