import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Member } from "src/member/entities/member.entity";
import { OneToOne, JoinColumn } from "typeorm";

export class CreateUtilityDto {
    @ApiProperty()
    @IsNotEmpty()
    surName: string;

    @ApiProperty()
    @IsNotEmpty()
    otherName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

}
