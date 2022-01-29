import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, CACHE_MANAGER, Req } from '@nestjs/common';
import { SubunitService } from './subunit.service';
import { CreateSubunitDto } from './dto/create-subunit.dto';
import { UpdateSubunitDto } from './dto/update-subunit.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Sub Unit') 
@Controller('api/subunit')
export class SubunitController {
  constructor(private readonly subunitService: SubunitService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Post()
  async create(@Req() req, @Body() createSubunitDto: CreateSubunitDto) {
    const email = req.user.email;
    const id = req.user.Id;
    return await this.subunitService.create(createSubunitDto, email, id);
  }

  
  @Get()
  async findAll() {
    //const value = await this.cacheManager.get('signedInUser')
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
