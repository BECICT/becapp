import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterDto } from 'src/common/filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { MultiFormUtilityDto } from 'src/utility/dto/multiForm-utility-dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Member')
@Controller('api/member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @Post()
  // async create(@Req() req, @Body() createMemberDto: CreateMemberDto) {
  //   const email = req.user.email;
  //   const id = req.user.Id;
  //   return await this.memberService.create(createMemberDto, email, id);
  // }

  @Get(':page/:pagesize')
  findAll(@Query()filterstring: FilterDto, @Req() req){
    return this.memberService.findAll();
    // (filterstring, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Get('creator/contact/:userId')
  findbyCreatorID(@Param('userId') userId: string) {
    return this.memberService.findbyCreatedId(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
  //   return this.memberService.update(id, updateMemberDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('multiform')
  async createform(@Body() dto: MultiFormUtilityDto, @Req() req: any){
     const email = req.user.email;
    const id = req.user.Id;
    const result = await this.memberService.processdata(dto, email, id)
  }
}
