import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Member } from "src/member/entities/member.entity";
import { Profile } from "src/profile/entities/profile.entity";

export class MultiFormUtilityDto extends PartialType(Profile) {
//member
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

    @ApiProperty()
    CreatedBy: string;

    @ApiProperty()
    CreatorID: string;
    
//CONTACT
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
   
    //EMPLOYMENT
    @ApiProperty()
    @IsNotEmpty()
    EmploymentStatus:string; 

    @ApiProperty()
    OfficeAddress:string;
 
    @ApiProperty()
    Profession:string;
   
    //Extral
    @ApiProperty()
    @IsNotEmpty()
    EducationalQualification: string

    @ApiProperty()
    Student: string

    @ApiProperty()
    NameOfSchool: string

    @ApiProperty()
    Level: string

    //SUBUNIT
    @ApiProperty()
    Name: string;
}