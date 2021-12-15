import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/filter.dto';
import { Repository } from 'typeorm';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { Employment } from './entities/employment.entity';

@Injectable()
export class EmploymentService {
  constructor(@InjectRepository(Employment) private emplymentRepo: Repository<Employment>){}

  async create(createEmploymentDto: CreateEmploymentDto, email: string, userId: string) {
    const employment = new Employment();
    const employmentresult = this.emplymentRepo.merge(employment, createEmploymentDto);
    employmentresult.CreatedBy = email;
    employmentresult.CreatorID = userId;   


    return await this.emplymentRepo.save(employmentresult);
  }

  findAll({ searchString }: FilterDto, page: number, pagesize: number): Promise<CreateEmploymentDto[]> {
    if(searchString){
    let emplyment = this.emplymentRepo.createQueryBuilder("employ").where('employ.EmploymentStatus ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('employ.OfficeAddress ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('employ.Profession ILIKE :searchString', {searchString: `%${searchString}%`}).skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();    
    return emplyment;
    }
    return this.emplymentRepo.createQueryBuilder().skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();
  }

  findOne(id: string) {
    return this.emplymentRepo.createQueryBuilder("employment")
            .where("employment.Id = :id", {id: id}).getOne()
  }

  async update(id: string, dto: UpdateEmploymentDto, email: string) {
    const getemployment = await this.findOne(id);
    if(getemployment === null || getemployment === undefined){
      throw new HttpException({
        error: `the information with this id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }
    const contactresult = this.emplymentRepo.merge(getemployment, dto);
    contactresult.UpdateBy = email;
    
    return await this.emplymentRepo.update(id, contactresult);
  }

  remove(id: string) {
    return this.emplymentRepo.delete(id);
  }
}
