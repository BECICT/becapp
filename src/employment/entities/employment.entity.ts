import { Member } from "src/member/entities/member.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Employment extends RecurrentBaseEntity {

    @Column()
    EmploymentStatus:string;
    
    @Column({nullable: true})
    OfficeAddress:string;

    @Column({nullable: true})
    Profession:string;

    @Column()
    memberId:string;

    // @OneToOne(() => Member, m => m.employment, {onDelete: 'CASCADE'})
    // @JoinColumn({name: 'memberId', referencedColumnName: 'Id'})
    // member:string;
    
}
