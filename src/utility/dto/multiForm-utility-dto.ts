import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Member } from "src/member/entities/member.entity";
import { Profile } from "src/profile/entities/profile.entity";

export class MultiFormUtilityDto extends PartialType(Profile) {
//member
    @ApiProperty({nullable: true})
    Tag_No: string;

    @ApiProperty({nullable: true})
    PhotoUrl: string;

    @ApiProperty({nullable: true})
    Title: string;

    @ApiProperty({nullable: true})
    Surname:string;

    @ApiProperty({nullable: true})
    Firstname:string;

    @ApiProperty({nullable: true})
    Othername:string;

    @ApiProperty({nullable: true})
    Birthdate:Date;

    @ApiProperty({nullable: true})
    Gender:string;

    @ApiProperty({nullable: true})
    Maritalstatus:string;

    @ApiProperty({nullable: true})
    Nextofkin:string;

    @ApiProperty({nullable: true})
    PhoneNoOfNextOfKin:string;

    @ApiProperty({nullable: true})
    MembershipStatus:string;

    @ApiProperty({nullable: true})
    SubunitId: string;

    @ApiProperty({nullable: true})
    CreatedBy: string;

    @ApiProperty({nullable: true})
    CreatorID: string;
    
//CONTACT
    @ApiProperty({nullable: true})
    @IsNotEmpty()
    Address1: string;

    @ApiProperty({nullable: true})
    Address2: string;

    @ApiProperty({nullable: true})
    @IsNotEmpty()
    @IsPhoneNumber()
    PrimaryPhoneNo: string;

    @ApiProperty({nullable: true})
    @IsPhoneNumber()
    OtherPhoneNo: string;

    @ApiProperty({nullable: true})
    @IsNotEmpty()
    @IsEmail()
    EmailAddress: string;
   
    //EMPLOYMENT
    @ApiProperty({nullable: true})
    @IsNotEmpty()
    EmploymentStatus:string; 

    @ApiProperty({nullable: true})
    OfficeAddress:string;
 
    @ApiProperty({nullable: true})
    Profession:string;
   
    //Extral
    @ApiProperty({nullable: true})
    @IsNotEmpty()
    EducationalQualification: string

    @ApiProperty({nullable: true})
    Student: string

    @ApiProperty({nullable: true})
    NameOfSchool: string

    @ApiProperty({nullable: true})
    Level: string

    //SUBUNIT
    @ApiProperty({nullable: true})
    Name: string;
}