import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto{
   
    @ApiProperty()
    fullname: string

    @ApiProperty()
    email:string

    @ApiProperty()
    password: string   

    @ApiProperty()
    confirmpassword: string 
}