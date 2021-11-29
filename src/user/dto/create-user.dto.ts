import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
   
    @ApiProperty()
    fullname: string

    @ApiProperty()
    email:string

    @ApiProperty()
    password: string   

    @ApiProperty()
    confirmpassword: string 
}