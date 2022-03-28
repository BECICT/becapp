import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { FilterDto } from 'src/common/filter.dto';
import { returnFeedback } from 'src/common/returnFunction';
import { Contact } from 'src/contact/entities/contact.entity';
import { Employment } from 'src/employment/entities/employment.entity';
import { Extra } from 'src/extra/entities/extra.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Connection, Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(@InjectRepository(Member) private memberrepo: Repository<Member>,
  @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  private connection:Connection
  ){}

  findAll() {
    try {
      // page = 1;
    // pagesize = 20;
    // if(searchString){
    // let members = this.memberrepo.createQueryBuilder("member")
    // .leftJoinAndSelect('member.profile', 'profile')
    // // .where('member.Tag_No ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Title ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Surname ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Firstname ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Othername ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Birthdate ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Gender ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.Maritalstatus ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.MembershipStatus ILIKE :searchString', {searchString: `%${searchString}%`})
    // // .orWhere('member.SubunitId ILIKE :searchString', {searchString: `%${searchString}%`})
    // .skip(limit * (page - 1))
    // .take(limit)
    // .getMany();    
    // return members;
    // }

    let members = this.memberrepo.find()
    //.leftJoinAndSelect('member.profile', 'profile')
    // .getMany();

    return returnFeedback({
      error: false,
      sucessMessage: 'Success',
      data: members,
      statusCode: HttpStatus.OK,
    });
    // this.memberrepo.createQueryBuilder().skip(limit * (page - 1))
    // .take(limit)
    // .getMany();
    } catch (error) {
      returnFeedback({
        error: true,
        sucessMessage: `${error.message}`,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async findany(id: string) {
    const result = await this.memberrepo.createQueryBuilder("member")
            .leftJoinAndSelect("member.contact", "contact")
            .leftJoinAndSelect("member.employment", "employment")
            .leftJoinAndSelect("member.extra", "extra")
            .leftJoinAndSelect("member.profile", "profile")            
            .where("member.Id = :id", {id: id})
            .getOne()
    // const result = this.memberrepo.
            return returnFeedback({
              error: false, 
              sucessMessage: "Success",
              data: result,
              statusCode: 200
            })
  }

  findbyCreatedId(id: string) {
    return this.memberrepo.createQueryBuilder("member")
            .where("member.CreatorID = :id", {id: id}).getOne()
  }

  // async update(id: string, dto: UpdateMemberDto) {
  //   const getmember = await this.findOne(id);
  //   if(getmember === null || getmember === undefined){
  //     throw new HttpException({
  //       error: `Member with id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
  //     }, HttpStatus.NOT_FOUND);
  //   }

  //   let member = new Member();
  //   member.Firstname = dto.Firstname;
  //   member.Birthdate = dto.Birthdate;
  //   member.Gender = dto.Gender;
  //   member.Maritalstatus = dto.Maritalstatus;
  //   member.MembershipStatus = dto.MembershipStatus;
  //   member.Nextofkin = dto.Nextofkin;
  //   member.Othername = dto.Othername;
  //   member.PhoneNoOfNextOfKin = dto.PhoneNoOfNextOfKin;
  //   member.PhotoUrl = dto.PhotoUrl;
  //   member.SubunitId = dto.SubunitId;
  //   member.Surname  = dto.Surname;
  //   member.Title = dto.Title;

  //   return await this.memberrepo.update(id, member)
  // }

  remove(id: string) {
    return this.memberrepo.delete(id);
  }

  async processdata(dto: CreateMemberDto, creatorName: string, creatorId: string){
    if (!dto) {
      throw new HttpException({
        error: `The form you submited is empty`, status: HttpStatus.NOT_FOUND}, HttpStatus.NOT_FOUND);      
    }
    
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.startTransaction()
    try {

    const profile = new Profile();
    const member = new Member();
    const contact = new Contact();
    const extra = new Extra();
    const employment = new Employment();

    console.log(dto)
    //------------------------------------

    /// DO YOUR CHECKS AND BUSINESS LOGIC HERE

    //------------------------------

    member.Tag_No = dto.tagNo
    member.PhotoUrl = dto.photoUrl
    member.Title = dto.title
    member.Surname = dto.surname
    member.Firstname = dto.firstname
    member.Othername = dto.othername
    member.Birthdate = dto.birthdate
    member.Gender = dto.gender
    member.Maritalstatus = dto.maritalstatus
    member.Nextofkin = dto.nextofkin
    member.PhoneNoOfNextOfKin = dto.phoneNoOfNextOfKin
    member.MembershipStatus = 'Active'
    member.Subunit = dto.subunitId
    member.CreatedBy = creatorName;
    member.CreatorID = creatorId;
    member.CreatedOn = new Date()

    const memberId = await queryRunner.manager.save(Member, member);

    profile.Area = dto.area
    profile.DateOfNewBirth = dto.dateOfNewBirth
    profile.PlaceOfNewBirth = dto.placeOfNewBirth
    profile.DateJoinedChurch = dto.dateJoinedChurch
    profile.WOFBIStatus = dto.wofbistatus 
    profile.WaterBaptizim = dto.waterBaptizim
    profile.DateOfWaterBaptizim = dto.dateOfWaterBaptizim
    profile.HolyGhostBaptisim = dto.holyGhostBaptisim
    profile.DateOfHolyGhostBaptizim = dto.dateOfHolyGhostBaptizim
    profile.WSFStatus = dto.wofbistatus //change
    profile.District = dto.district
    profile.Zone = dto.zone
    profile.CreatedBy = creatorName
    profile.CreatedOn = new Date()
    profile.CreatorID = creatorId
    profile.memberId = memberId.Id;

   
    
    contact.Address1 = dto.Address1
    contact.CreatorID = creatorId;
    contact.Address2 = dto.address2
    contact.PrimaryPhoneNo = dto.PrimaryPhoneNo
    contact.OtherPhoneNo = dto.OtherPhoneNo
    contact.EmailAddress = dto.EmailAddress    
    contact.CreatedBy = creatorName
    contact.CreatedOn = new Date()
    contact.memberId = memberId.Id;

    extra.EducationalQualification = dto.EducationalQualification
    extra.Student = dto.student
    extra.NameOfSchool = dto.nameOfSchool
    extra.Level = dto.level
    extra.CreatedBy = creatorName
    extra.CreatedOn = new Date()
    extra.CreatorID = creatorId;
    extra.memberId = memberId.Id;


    employment.EmploymentStatus = dto.EmploymentStatus
    employment.OfficeAddress = dto.officeAddress
    employment.Profession = dto.profession
    employment.CreatedBy = creatorName
    employment.CreatedOn = new Date()
    employment.CreatorID = creatorId;
    employment.memberId = memberId.Id;

   
    // await queryRunner.startTransaction();

   
      
      await queryRunner.manager.save(Profile, profile);
      await queryRunner.manager.save(Contact, contact);
      await queryRunner.manager.save(Extra, extra);
      await queryRunner.manager.save(Employment, employment);

      await queryRunner.commitTransaction();
      
      // const result = {...dto, Id}

      return returnFeedback({
        error: false, 
        sucessMessage: "Success",
        data: memberId,
        statusCode: 200
      })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return returnFeedback({
        error: true, 
        errorMessage: `Somthing went wrong ${error.message}`,
        statusCode: HttpStatus.BAD_REQUEST
      })
    }finally{
      await queryRunner.release();
    }
  }

}
