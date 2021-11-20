import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubunitDto } from './dto/create-subunit.dto';
import { UpdateSubunitDto } from './dto/update-subunit.dto';
import { Subunit } from './entities/subunit.entity';

@Injectable()
export class SubunitService {
  constructor(@InjectRepository(Subunit) private subunitrepo: Repository<Subunit>){}

  async create(createsubunitdto: CreateSubunitDto) {
    try{
      if(createsubunitdto.Name === null){
        return `The Name filed can not be empty`
      }
      const subunit = this.subunitrepo.create(createsubunitdto);    
      return await this.subunitrepo.save(subunit);

    }catch(e){
      return (e as Error).message;
    }
  }

  findAll() {
    return this.subunitrepo.find();
  }

  findOne(id: string) {
    return this.subunitrepo.findOne(id);
  }

  update(id: string, updateSubunitDto: UpdateSubunitDto) {
    const getsubunit = this.findOne(id);
    if(getsubunit === null || getsubunit === undefined){
      throw new HttpException({
        error: `subunit with id ${id} does not exists or has been deleted`, status: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND);
    }

    return this.subunitrepo.update(id, updateSubunitDto)
    //return `This action updates a #${id} subunit`;
  }

  remove(id: string) {
    return this.subunitrepo.delete(id);
  }
}
