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

    @Column({nullable: true})
    Level: string

    @Column()
    memberId:string;

    
    // @OneToOne(() => Member, m => m.extra, {onDelete: 'CASCADE'})
    // @JoinColumn({name: 'memberId', referencedColumnName: 'Id'})
    // member:string;
}
