import { Body, Controller, Get, Post } from '@nestjs/common';
import { ToConvert } from './interface/to-convert.interface';
import { AppService } from './app.service';

// Requêtes à envoyer à l'url : localhost:3000/arabic-to-roman
@Controller('arabic-to-roman')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAbout() {
	return this.appService.about();
  }

  @Post()
  convertToRoman(@Body() toConvert: ToConvert) {
    return this.appService.convertToRoman(toConvert);
  }
}
