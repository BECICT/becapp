import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from 'src/common/filter.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags("Employment")
@Controller('employment')
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}

  @Post()
  create(@Req() req, @Body() createEmploymentDto: CreateEmploymentDto) {
    const email = req.user.email;
    const id = req.user.Id;
    return this.employmentService.create(createEmploymentDto, email, id);
  }

  @Get()
  findAll(@Query()filterstring: FilterDto, @Param('page')page: number, @Param('pagesize')pagesize: number) {
    return this.employmentService.findAll(filterstring, page, pagesize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employmentService.findOne(id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateEmploymentDto: UpdateEmploymentDto) {
    const email = req.user.email;
    return this.employmentService.update(id, updateEmploymentDto, email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employmentService.remove(id);
  }
}
