import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubunitService } from './subunit.service';
import { CreateSubunitDto } from './dto/create-subunit.dto';
import { UpdateSubunitDto } from './dto/update-subunit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sub Unit') 
@Controller('api/subunit')
export class SubunitController {
  constructor(private readonly subunitService: SubunitService) {}

  @Post()
  async create(@Body() createSubunitDto: CreateSubunitDto) {
    return await this.subunitService.create(createSubunitDto);
  }

  @Get()
  findAll() {
    return this.subunitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subunitService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubunitDto: UpdateSubunitDto) {
    return this.subunitService.update(id, updateSubunitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subunitService.remove(id);
  }
}
