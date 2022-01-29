import { RecurrentBaseEntity } from "src/recurrentBaseEntity";
import { Column, Entity } from "typeorm";


@Entity()
export class Utility extends RecurrentBaseEntity {
   
   @Column()
    surName: string;

    @Column()
    otherName: string;

    @Column()
    email: string;

    @Column()
    confirmationCode: string;

    @Column()
    phoneNumber: string;

    @Column({default: false, nullable: true})
    processed: boolean;
}
