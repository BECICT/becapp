import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/common/filter.dto';
import { getConnection, Repository } from 'typeorm';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { Utility } from './entities/utility.entity';

@Injectable()
export class UtilityService {
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
}
