import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

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
    @IsPhoneNumber()
    phoneNumber: string;
}
