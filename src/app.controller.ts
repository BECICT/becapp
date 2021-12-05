import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('hello')
    getHello(): string {
      return this.appService.getHello();
    }


}




