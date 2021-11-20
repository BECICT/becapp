import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubunitModule } from './subunit/subunit.module';
import { MemberModule } from './member/member.module';
import { ContactModule } from './contact/contact.module';
import { EmploymentModule } from './employment/employment.module';
import { ExtraModule } from './extra/extra.module';
import { ProfileModule } from './profile/profile.module';
import config from 'ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), SubunitModule, MemberModule, ContactModule, EmploymentModule, ExtraModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}