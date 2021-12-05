import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags("Extral")
@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Body() createExtraDto: CreateExtraDto) {
    return this.extraService.create(createExtraDto);
  }

  @Get()
  findAll() {
    return this.extraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExtraDto: UpdateExtraDto) {
    return this.extraService.update(+id, updateExtraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extraService.remove(+id);
  }
}
