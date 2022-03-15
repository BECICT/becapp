import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Member, Profile]),
    
  ], 
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule {}
