import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FilterDto {
    @ApiProperty()
    @ApiPropertyOptional()
    searchString: string;   
}