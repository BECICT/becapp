import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    //private jwtService: JwtService
    ) {}


}




