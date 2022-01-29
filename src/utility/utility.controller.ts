import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from 'src/common/filter.dto';

@ApiTags('Utility')
@Controller('api/utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @Post('reg')
  async create(@Body() dto: CreateUtilityDto) {
    // const email = req.user.email;
    // const id = req.user.Id;
    const result = await this.utilityService.create(dto);
    return result;
  }

  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':page/:pagesize')
  findAll(@Query()filterstring: FilterDto, @Param('page')page: number, @Param('pagesize')pagesize: number): Promise<CreateUtilityDto[]> {
    return this.utilityService.findAll(filterstring, page, pagesize);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilityService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUtilityDto) {
    return this.utilityService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilityService.remove(id);
  }

  @Get(':code')
  confirmCode(@Param('code') code: string)
  {
    return this.utilityService.confirm(code)
  }
}
