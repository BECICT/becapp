import { Module } from '@nestjs/common';
import { ExtraService } from './extra.service';
import { ExtraController } from './extra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extra } from './entities/extra.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Extra])],
  controllers: [ExtraController],
  providers: [ExtraService]
})
export class ExtraModule {}
