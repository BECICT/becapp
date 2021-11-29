import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'secret', signOptions: {expiresIn: '10d'} })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
