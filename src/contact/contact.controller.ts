import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilterDto } from 'src/common/filter.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Req() req, @Body() createContactDto: CreateContactDto) {
    const email = req.user.email;
    const id = req.user.Id;
    return this.contactService.create(createContactDto, email, id);
  }

  @Get()
  findAll(@Query()filterstring: FilterDto, @Param('page')page: number, @Param('pagesize')pagesize: number) {
    return this.contactService.findAll(filterstring, page, pagesize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    const email = req.user.email;
    return this.contactService.update(id, updateContactDto, email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
