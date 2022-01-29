import { CacheModule, Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { UtilityController } from './utility.controller';
import { Utility } from './entities/utility.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utility]), CacheModule.register()
  ],
  controllers: [UtilityController],
  providers: [UtilityService]
})
export class UtilityModule {}
