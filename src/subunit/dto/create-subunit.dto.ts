import { ApiProperty } from "@nestjs/swagger";

export class CreateSubunitDto {
    @ApiProperty()
    Name: string;
}
