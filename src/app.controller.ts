import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
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
	if (!toConvert.date) {
		return new TypeError('Aucune date en entrée...')
	} else if (!(/^([0-3][0-9]-[0-1][0-9]-[0-9]{4})$/.test(toConvert.date))) {
		return new TypeError('Ce n\'est pas une date...')
	}
    return this.appService.convertToRoman(toConvert);
  }
}
