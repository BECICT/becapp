import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/filter.dto';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private contactRepo: Repository<Contact>){}
  
  async create(createContactDto: CreateContactDto, creatoremail: string, creatorId: string) {
    const contact = new Contact()
    const contactresult = this.contactRepo.merge(contact, createContactDto);
    contactresult.CreatedBy = creatoremail;
    contactresult.CreatorID = creatorId;
    
    return await this.contactRepo.save(contactresult);
  }

  findAll({ searchString }: FilterDto, page: number, pagesize: number): Promise<CreateContactDto[]> {
    if(searchString){
    let contacts = this.contactRepo.createQueryBuilder("contact").where('contact.Address1 ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('contact.Address2 ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('contact.PrimaryPhoneNo ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('contact.OtherPhoneNo ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('contact.EmailAddress ILIKE :searchString', {searchString: `%${searchString}%`}).skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();    
    return contacts;
    }
    return this.contactRepo.createQueryBuilder().skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();
  }

  findOne(id: string) {
    return this.contactRepo.createQueryBuilder("contact")
            .where("contact.Id = :id", {id: id}).getOne()
  }

  async update(id: string, dto: UpdateContactDto, email: string) {
    const getcontact = await this.findOne(id);
    if(getcontact === null || getcontact === undefined){
      throw new HttpException({
        error: `Contact with id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }

    
    const contactresult = this.contactRepo.merge(getcontact, dto);
    contactresult.UpdateBy = email;
    
    return await this.contactRepo.update(id, contactresult);
  }

  remove(id: string) {
    return this.contactRepo.delete(id);
  }
}
