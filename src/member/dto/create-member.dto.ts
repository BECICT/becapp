import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMemberDto {
    @ApiProperty()
    Tag_No: string;

    @ApiProperty()
    PhotoUrl: string;

    @ApiProperty()
    Title: string;

    @ApiProperty()
    Surname:string;

    @ApiProperty()
    Firstname:string;

    @ApiProperty()
    Othername:string;

    @ApiProperty()
    Birthdate:Date;

    @ApiProperty()
    Gender:string;

    @ApiProperty()
    Maritalstatus:string;

    @ApiProperty()
    Nextofkin:string;

    @ApiProperty()
    PhoneNoOfNextOfKin:string;

    @ApiProperty()
    MembershipStatus:string;

    @ApiProperty()
    SubunitId: string;

}




