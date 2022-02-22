import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/filter.dto';
import { CreateContactDto } from 'src/contact/dto/create-contact.dto';
import { Contact } from 'src/contact/entities/contact.entity';
import { CreateEmploymentDto } from 'src/employment/dto/create-employment.dto';
import { Employment } from 'src/employment/entities/employment.entity';
import { CreateExtraDto } from 'src/extra/dto/create-extra.dto';
import { Extra } from 'src/extra/entities/extra.entity';
import { Member } from 'src/member/entities/member.entity';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { Profile } from 'src/profile/entities/profile.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { MultiFormUtilityDto } from './dto/multiForm-utility-dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { Utility } from './entities/utility.entity';

@Injectable()
export class UtilityService {
  [x: string]: any;
  constructor(@InjectRepository(Utility) private utilityrepo: Repository<Utility>){}

  async create(dto: CreateUtilityDto) {
    const utility = new Utility();

    const utilityResult = this.utilityrepo.merge(utility, dto);
    utilityResult.CreatedBy = dto.email
    utilityResult.CreatorID = new Date().toString()
    utilityResult.confirmationCode = (Math.random() + 1).toString(36).substring(7);

    const result =  await this.utilityrepo.save(utilityResult);
    return result;
  }

  findAll({ searchString }: FilterDto, page: number, pagesize: number): Promise<CreateUtilityDto[]> {
    if(searchString){
    let utility = this.utilityrepo.createQueryBuilder("utility").where('utility.email ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('utility.phoneNumber ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('utility.processed ILIKE :searchString', {searchString: `%${searchString}%`})
    .skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();    
    return utility;
    }
    return this.utilityrepo.createQueryBuilder().skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();
  }

  async findOne(id: string) {
    const result = await this.utilityrepo.findOne(id);
    return result;
  }

  async update(id: string, updateutilityDto: UpdateUtilityDto) {
    const getutility = await this.findOne(id);
    if(getutility === null || getutility === undefined){
      throw new HttpException({
        error: `this id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }

    const result = await getConnection().createQueryBuilder().update(Utility).set({processed: updateutilityDto.processed}).where("Id = :Id", {Id: id}).execute();
    return result;
  }

  async remove(id: string) {
    return await this.utilityrepo.delete(id);
  }

  async confirm(code: string){
    let confirm = this.utilityrepo.createQueryBuilder("utility")
    .where("utility.confirmationCode = :code", {confirmationCode: code}).getOne()       
  }

  async processdata(dto: MultiFormUtilityDto, creatorName: string, creatorId: string){
    if (!dto) {
      throw new HttpException({
        error: `The form you submited is empty`, status: HttpStatus.NOT_FOUND}, HttpStatus.NOT_FOUND);      
    }
    
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect()
    try {

    const profile = new CreateProfileDto();
    const member = new Member();
    const contact = new CreateContactDto();
    const extra = new CreateExtraDto();
    const employment = new CreateEmploymentDto();

    profile.Area = dto.Area
    profile.DateOfNewBirth = dto.DateOfNewBirth
    profile.PlaceOfNewBirth = dto.PlaceOfNewBirth
    profile.DateJoinedChurch = dto.DateJoinedChurch
    profile.WOFBIStatus = dto.WOFBIStatus 
    profile.WaterBaptizim = dto.WaterBaptizim
    profile.DateOfWaterBaptizim = dto.DateOfWaterBaptizim
    profile.HolyGhostBaptisim = dto.HolyGhostBaptisim
    profile.DateOfHolyGhostBaptizim = dto.DateOfHolyGhostBaptizim
    profile.WSFStatus = dto.WSFStatus
    profile.Area = dto.Area
    profile.District = dto.District
    profile.Zone = dto.Zone

    member.Tag_No = dto.Tag_No
    member.PhotoUrl = dto.PhotoUrl
    member.Title = dto.Title
    member.Surname = dto.Surname
    member.Firstname = dto.Firstname
    member.Othername = dto.Othername
    member.Birthdate = dto.Birthdate
    member.Gender = dto.Gender
    member.Maritalstatus = dto.Maritalstatus
    member.Nextofkin = dto.Nextofkin
    member.PhoneNoOfNextOfKin = dto.PhoneNoOfNextOfKin
    member.MembershipStatus = dto.MembershipStatus
    member.SubunitId = dto.SubunitId
    member.CreatedBy = creatorName;
    member.CreatorID = creatorId;
    
    contact.Address1 = dto.Address1
    contact.Address2 = dto.Address2
    contact.PrimaryPhoneNo = dto.PrimaryPhoneNo
    contact.OtherPhoneNo = dto.OtherPhoneNo
    contact.EmailAddress = dto.EmailAddress

    extra.EducationalQualification = dto.EducationalQualification
    extra.Student = dto.Student
    extra.NameOfSchool = dto.NameOfSchool
    extra.Level = dto.Level

    employment.EmploymentStatus = dto.EmploymentStatus
    employment.OfficeAddress = dto.OfficeAddress
    employment.Profession = dto.Profession

   
    await queryRunner.startTransaction();

   
      await queryRunner.manage.save(Member, member);
      await queryRunner.manage.save(Profile, profile);
      await queryRunner.manage.save(Contact, contact);
      await queryRunner.manage.save(Extra, extra);
      await queryRunner.manage.save(Employment, employment);

      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction()
      return error.message
    }finally{
      await queryRunner.release();
    }
  }
}
