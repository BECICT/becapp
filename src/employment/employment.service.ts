import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { UpdateEmploymentDto } from './dto/update-employment.dto';
import { Employment } from './entities/employment.entity';

@Injectable()
export class EmploymentService {
  constructor(@InjectRepository(Employment) private emplymentRepo: Repository<Employment>){}

  create(createEmploymentDto: CreateEmploymentDto, email: string, userId: string) {

    
    return 'This action adds a new employment';
  }

  findAll() {
    return `This action returns all employment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employment`;
  }

  update(id: number, updateEmploymentDto: UpdateEmploymentDto) {
    return `This action updates a #${id} employment`;
  }

  remove(id: number) {
    return `This action removes a #${id} employment`;
  }
}
