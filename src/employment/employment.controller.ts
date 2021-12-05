import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  findAll() {
    return this.employmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmploymentDto: UpdateEmploymentDto) {
    return this.employmentService.update(+id, updateEmploymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employmentService.remove(+id);
  }
}
