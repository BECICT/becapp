import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateExtraDto {
   
    @ApiProperty()
    @IsNotEmpty()
    EducationalQualification: string

    @ApiProperty()
    Student: string

    @ApiProperty()
    NameOfSchool: string

    @ApiProperty()
    Level: string
}
