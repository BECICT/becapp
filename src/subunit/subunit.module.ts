import { Module } from '@nestjs/common';
import { SubunitService } from './subunit.service';
import { SubunitController } from './subunit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subunit } from './entities/subunit.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Subunit])
  ],
  controllers: [SubunitController],
  providers: [SubunitService]
})
export class SubunitModule {}
 