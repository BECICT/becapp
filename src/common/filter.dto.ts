import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class FilterDto {
    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    searchString: string;

    @ApiProperty({default: 1})
    @IsString()
    page: number;

    @ApiProperty({default: 15})
    @ApiPropertyOptional()
    @IsOptional()
    limit: number;  
}