import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateContactDto {
    @ApiProperty()
    @IsNotEmpty()
    Address1: string;

    @ApiProperty()
    Address2: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    PrimaryPhoneNo: string;

    @ApiProperty()
    @IsPhoneNumber()
    OtherPhoneNo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    EmailAddress: string;
}
