import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/filter.dto';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(@InjectRepository(Member) private memberrepo: Repository<Member>){}

  async create(dto: CreateMemberDto, creatorName: string, creatorId: string): Promise<CreateMemberDto> {

    let member = new Member();
    member.Firstname = dto.Firstname; 
    member.Birthdate = dto.Birthdate;
    member.Gender = dto.Gender;
    member.Maritalstatus = dto.Maritalstatus;
    member.MembershipStatus = dto.MembershipStatus;
    member.Nextofkin = dto.Nextofkin;
    member.Othername = dto.Othername;
    member.PhoneNoOfNextOfKin = dto.PhoneNoOfNextOfKin;
    member.PhotoUrl = dto.PhotoUrl;
    member.SubunitId = dto.SubunitId;
    member.Surname  = dto.Surname;
    member.Tag_No = dto.Tag_No;
    member.Title = dto.Title;
    member.CreatedBy = creatorName;
    member.CreatorID = creatorId;

    return await this.memberrepo.save(member);
  }

  findAll({ searchString }: FilterDto, page: number, pagesize: number): Promise<CreateMemberDto[]> {
    // page = 1;
    // pagesize = 20;
    if(searchString){
    let members = this.memberrepo.createQueryBuilder("member").where('member.Tag_No ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Title ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Surname ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Firstname ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Othername ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Birthdate ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Gender ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.Maritalstatus ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.MembershipStatus ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('member.SubunitId ILIKE :searchString', {searchString: `%${searchString}%`}).skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();    
    return members;
    }
    return this.memberrepo.createQueryBuilder().skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();
  }

  findOne(id: string) {
    return this.memberrepo.createQueryBuilder("member")
            .where("member.Id = :id", {id: id}).getOne()
  }

  async update(id: string, dto: UpdateMemberDto) {
    const getmember = await this.findOne(id);
    if(getmember === null || getmember === undefined){
      throw new HttpException({
        error: `Member with id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }

    let member = new Member();
    member.Firstname = dto.Firstname;
    member.Birthdate = dto.Birthdate;
    member.Gender = dto.Gender;
    member.Maritalstatus = dto.Maritalstatus;
    member.MembershipStatus = dto.MembershipStatus;
    member.Nextofkin = dto.Nextofkin;
    member.Othername = dto.Othername;
    member.PhoneNoOfNextOfKin = dto.PhoneNoOfNextOfKin;
    member.PhotoUrl = dto.PhotoUrl;
    member.SubunitId = dto.SubunitId;
    member.Surname  = dto.Surname;
    member.Title = dto.Title;

    return await this.memberrepo.update(id, member)
  }

  remove(id: string) {
    return this.memberrepo.delete(id);
  }
}
