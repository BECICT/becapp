import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @ApiProperty()
    @IsNotEmpty()
    DateOfNewBirth: Date;

    @ApiProperty()
    PlaceOfNewBirth: string;

    @ApiProperty()
    @IsNotEmpty()
    DateJoinedChurch: Date;

    @ApiProperty()
    @IsNotEmpty()
    WOFBIStatus:string;

    @ApiProperty()
    @IsNotEmpty()
    WaterBaptizim:boolean;

    @ApiProperty()
    DateOfWaterBaptizim:Date;

    @ApiProperty()
    @IsNotEmpty()
    HolyGhostBaptisim:boolean;

    @ApiProperty()
    DateOfHolyGhostBaptizim:Date;

    @ApiProperty()
    @IsNotEmpty()
    WSFStatus:string;

    @ApiProperty()
    @IsNotEmpty()
    Area:string;

    @ApiProperty()
    @IsNotEmpty()
    District:string;

    @ApiProperty()
    @IsNotEmpty()
    Zone:string;
}
