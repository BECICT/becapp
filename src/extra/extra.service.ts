import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/filter.dto';
import { Repository } from 'typeorm';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { Extra } from './entities/extra.entity';

@Injectable()
export class ExtraService {
  constructor(@InjectRepository(Extra) private extraRepo: Repository<Extra>){}

  async create(dto: CreateExtraDto, email: string, userId: string) {
    const extra = new Extra();
    const extraresult = this.extraRepo.merge(extra, dto);
    extraresult.CreatedBy = email;
    extraresult.CreatorID = userId;   
    return await this.extraRepo.save(extraresult);
  }

  findAll({ searchString }: FilterDto, page: number, pagesize: number): Promise<CreateExtraDto[]> {
    if(searchString){
    let extraresult = this.extraRepo.createQueryBuilder("extra").where('extra.EducationalQualification ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('extra.Student ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('extra.NameOfSchool ILIKE :searchString', {searchString: `%${searchString}%`})
    .orWhere('extra.Level ILIKE :searchString', {searchString: `%${searchString}%`}).skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();    
    return extraresult;
    }
    return this.extraRepo.createQueryBuilder().skip(pagesize * (page - 1))
    .take(pagesize)
    .getMany();
  }

  findOne(id: string) {
    return this.extraRepo.createQueryBuilder("extra")
            .where("extra.Id = :id", {id: id}).getOne()
  }

  async update(id: string, dto: UpdateExtraDto, email: string) {
    const getextra = await this.findOne(id);
    if(getextra === null || getextra === undefined){
      throw new HttpException({
        error: `the information with this id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }
    const extraresult = this.extraRepo.merge(getextra, dto);
    extraresult.UpdateBy = email;
    
    return await this.extraRepo.update(id, extraresult);
  }

  remove(id: string) {
    return this.extraRepo.delete(id);
  }
}
