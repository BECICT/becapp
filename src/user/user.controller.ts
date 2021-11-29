import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly appService: UserService,
        private jwtService: JwtService
        ) {}

    @Post('signup')
  async signup(@Body() userdto: CreateUserDto) {
    let newuser = await this.appService.signup(userdto);

    const{Id, password, failedloginAttempt, firstlogin, ...result} = newuser

    return result;
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response ){
    const user = await this.appService.findOneByEmail(dto.email);

    if(!user){
      throw new BadRequestException('invalid UserName or PassWord');
    }

    if(!await bcrypt.compare(dto.password, user.password)){
      throw new BadRequestException('invalid UserName or PassWord');
    }

    const jwt = await this.jwtService.signAsync({Id: user.Id})

    res.cookie('jwt', jwt, {httpOnly: true})

    const{fullname, ...result} = user

    return {message: `${fullname} successfuly logged in`};    
  }


  @Get('user')
  async getUser(@Req()req: Request){
    try{
    const cookies = req.cookies['jwt']

    const data = await this.jwtService.verifyAsync(cookies);
    if(!data){
      throw new UnauthorizedException
    }

    const user = await this.appService.findOneById(data.Id);

    const{password, failedloginAttempt, firstlogin, CreatedOn, UpdatedOn, ...result} = user
    return result;
    }catch(e){
      throw new UnauthorizedException;
    }
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response){
    res.clearCookie('jwt');

    return ({message: 'you logged out'})
  }
}
