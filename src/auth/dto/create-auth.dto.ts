import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto{
   
    @ApiProperty()
    @IsNotEmpty()
    regCode: string

    @ApiProperty()
    @IsNotEmpty()
    fullname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    password: string   

    @ApiProperty()
    @IsNotEmpty()
    confirmpassword: string 
}