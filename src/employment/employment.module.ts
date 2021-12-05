import { Module } from '@nestjs/common';
import { EmploymentService } from './employment.service';
import { EmploymentController } from './employment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employment } from './entities/employment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Employment])],
  controllers: [EmploymentController],
  providers: [EmploymentService]
})
export class EmploymentModule {}
