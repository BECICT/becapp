import { Member } from "src/member/entities/member.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Employment extends RecurrentBaseEntity {

    @Column()
    EmploymentStatus:string;
    
    @Column()
    OfficeAddress:string;

    @Column()
    Profession:string;

    @Column()
    memberId:string;
    
}
