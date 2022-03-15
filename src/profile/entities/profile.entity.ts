import { Member } from "src/member/entities/member.entity";
import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Profile extends RecurrentBaseEntity {

    @Column()
    DateOfNewBirth: Date;

    @Column({nullable: true})
    PlaceOfNewBirth: string;

    @Column()
    DateJoinedChurch: Date;

    @Column()
    WOFBIStatus:string;

    @Column({default: false})
    WaterBaptizim:boolean;

    @Column({nullable:true})
    DateOfWaterBaptizim:Date;

    @Column()
    HolyGhostBaptisim:boolean;

    @Column({nullable:true})
    DateOfHolyGhostBaptizim:Date;

    @Column()
    WSFStatus:string;

    @Column()
    Area:string;

    @Column()
    District:string;

    @Column()
    Zone:string;

    @Column()
    memberId:string;

    @OneToOne(() => Member, m => m.profile, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'memberId', referencedColumnName: 'Id'})
    member:string;
}
