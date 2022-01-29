import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateSubunitDto } from './dto/create-subunit.dto';
import { UpdateSubunitDto } from './dto/update-subunit.dto';
import { Subunit } from './entities/subunit.entity';

@Injectable()
export class SubunitService {
  constructor(@InjectRepository(Subunit) private subunitrepo: Repository<Subunit>){}

  async create(createsubunitdto: CreateSubunitDto, email: string, creatorId: string) {
    try{
      if(createsubunitdto.Name === null){
        throw new BadRequestException({status: HttpStatus.FORBIDDEN, error:`The Name filed can not be empty`}); 
      }

      let subunit = new Subunit();
      subunit.Name = createsubunitdto.Name;
      subunit.CreatedBy = email;
      subunit.CreatorID = creatorId;


      const subunitcreate = this.subunitrepo.create(subunit);    
      return await this.subunitrepo.save(subunitcreate);

    }catch(e){
      throw new BadRequestException({status: HttpStatus.FORBIDDEN}); 
    }
  }

  findAll() {
    return this.subunitrepo.find();
  }

  async findOne(id: string) {
    const result = await this.subunitrepo.findOne(id);
    return result;
  }

  async update(id: string, updateSubunitDto: UpdateSubunitDto) {
    const getsubunit = await this.findOne(id);
    if(getsubunit === null || getsubunit === undefined){
      throw new HttpException({
        error: `subunit with id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }

    const result = await getConnection().createQueryBuilder().update(Subunit).set({Name: updateSubunitDto.Name}).where("Id = :Id", {Id: id}).execute();
    return result;
  }

  async remove(id: string) {
    return await this.subunitrepo.delete(id);
  }
}
