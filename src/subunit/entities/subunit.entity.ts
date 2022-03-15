import { Member } from "src/member/entities/member.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Subunit extends RecurrentBaseEntity {
   
    @Column({ unique: true, nullable: false, })
    Name: string;

    // @OneToMany(()=> Member, m => m.Subunit)
    // Member: Member[]
}
