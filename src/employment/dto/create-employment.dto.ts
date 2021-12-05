import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateEmploymentDto {
    
    @ApiProperty()
    @IsNotEmpty()
    EmploymentStatus:string; 

    @ApiProperty()
    OfficeAddress:string;
 
    @ApiProperty()
    Profession:string;
}
