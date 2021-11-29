import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
      ){}
    
      async signup(dto: CreateUserDto): Promise<User>{
    
        if(dto.password !== dto.confirmpassword){
           throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'The password and confirm password mismatched',
          }, HttpStatus.FORBIDDEN);
        }
    
        const saltOrRounds = 12
    
        const hashPassword = await bcrypt.hash(dto.password, saltOrRounds);
    
        const newUser = new User()
        newUser.fullname = dto.fullname;
        newUser.email = dto.email;
        newUser.password = hashPassword;
        newUser.failedloginAttempt = 0;
        newUser.firstlogin = false;
        
        return this.userRepository.save(newUser);
      }
    
      async findOneByEmail(condition: any){
        const user = await this.userRepository.findOne({ where: {email: condition}});
        return user
      }
    
      async findOneById(Id: string){
        const user = await this.userRepository.findOne(Id);
        return user;
      }
}
