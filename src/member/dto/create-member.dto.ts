    import { PartialType } from "@nestjs/mapped-types";
    import { ApiProperty } from "@nestjs/swagger";
    import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
    import { Member } from "src/member/entities/member.entity";
    import { Profile } from "src/profile/entities/profile.entity";
    
    export class CreateMemberDto {
    //member
        @ApiProperty({nullable: true})
        tagNo: string;
    
        @ApiProperty({nullable: true})
        photoUrl: string;
    
        @ApiProperty({nullable: true})
        title: string;
    
        @ApiProperty({nullable: true})
        surname:string;
    
        @ApiProperty({nullable: true})
        firstname:string;
    
        @ApiProperty({nullable: true})
        othername:string;
    
        @ApiProperty({nullable: true})
        birthdate:Date;
    
        @ApiProperty({nullable: true})
        gender:string;
    
        @ApiProperty({nullable: true})
        maritalstatus:string;
    
        @ApiProperty({nullable: true})
        nextofkin:string;
    
        @ApiProperty({nullable: true})
        phoneNoOfNextOfKin:string;
    
        @ApiProperty({nullable: true})
        membershipStatus:string;
    
        @ApiProperty({nullable: true})
        subunitId: string;
    
        @ApiProperty({nullable: true})
        createdBy: string;
    
        @ApiProperty({nullable: true})
        creatorID: string;
        
    //CONTACT
        @ApiProperty({nullable: true})
        @IsNotEmpty()
        Address1: string;
    
        @ApiProperty({nullable: true})
        address2: string;
    
        @ApiProperty()
        // @IsNotEmpty()
        // @IsPhoneNumber()
        PrimaryPhoneNo: string;
    
        @ApiProperty()
        // @IsPhoneNumber()
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
        officeAddress:string;
     
        @ApiProperty({nullable: true})
        profession:string;
       
        //Extral
        @ApiProperty({nullable: true})
        @IsNotEmpty()
        EducationalQualification: string
    
        @ApiProperty({nullable: true})
        student: string
    
        @ApiProperty({nullable: true})
        nameOfSchool: string
    
        @ApiProperty({nullable: true})
        level: string
    
        //SUBUNIT
        @ApiProperty({nullable: true})
        name: string;
    
        @ApiProperty({nullable: true})
        dateOfNewBirth: Date
    
        @ApiProperty({nullable: true})
        dateJoinedChurch: Date
    
        @ApiProperty({nullable: true})
        dateOfHolyGhostBaptizim: Date    
    
        @ApiProperty({nullable: true})
        placeOfNewBirth: string
    
        @ApiProperty({nullable: true})
        wofbistatus: string
    
        @ApiProperty({nullable: true})
        zone: string
    
        @ApiProperty({nullable: true})
        district: string
        
        @ApiProperty({nullable: true})
        wSFStatus: string
    
        @ApiProperty({nullable: true})
        waterBaptizim: boolean
    
        @ApiProperty({nullable: true})
        holyGhostBaptisim: boolean
    
        @ApiProperty({nullable: true})
        area: string
    
        @ApiProperty({nullable: true})
        dateOfWaterBaptizim:Date
    }



