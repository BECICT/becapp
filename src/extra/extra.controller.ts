import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from 'src/common/filter.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags("Extral")
@Controller('api/extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateExtraDto) {
    const email = req.user.email;
    const id = req.user.Id;
    return this.extraService.create(dto, email, id);
  }

  @Get()
  findAll(@Query()filterstring: FilterDto, @Param('page')page: number, @Param('pagesize')pagesize: number) {
    return this.extraService.findAll(filterstring, page, pagesize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraService.findOne(id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateExtraDto: UpdateExtraDto) {
    const email = req.user.email;
    return this.extraService.update(id, updateExtraDto, email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extraService.remove(id);
  }
}
