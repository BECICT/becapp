import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubunitDto } from './create-subunit.dto';

export class UpdateSubunitDto extends PartialType(CreateSubunitDto) {
    @ApiProperty()
    Name: string;
}
