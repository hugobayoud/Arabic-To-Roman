import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { ToConvert } from './interface/to-convert.interface';
import { isValidDate } from './helper/date-helper';

@Injectable()
export class AppService {
  /**
   * For homepage
   */
  about() {
    return 'Solution proposée par Hugo BAYOUD pour le test technique : concevoir une API REST qui recoit une date en chiffres arabes et la retourne en chiffres romains';
  }

  /**
   * Convert an arabic number to roman
   * @param 	{number} number arabic number to be converted
   * @return 	{string} 		the number converted
   */
  romanize(number: number): string {
    let romanizedNumber = '';
    const symbols = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    for (const i in symbols) {
      while (number >= symbols[i]) {
        romanizedNumber += i;
        number -= symbols[i];
      }
    }

    return romanizedNumber;
  }

  /**
   * Check if the date is valid and if so, romanized it
   * @param 	{ToConvert} toConvert 	contains the Body of the request with the date to romanized (if valid)
   * @return 	{[Type]} 				The arabic date and the romanized version
   */
  convertToRoman(toConvert: ToConvert) {
    if (!toConvert.date) {
      throw new NotFoundException('Aucune date en entrée...');
    } else if (
      !/^([0-9]{2}(-|\/|\\|\.)[0-9]{2}(-|\/|\\|\.)(-|)[0-9]*)$/.test(
        toConvert.date,
      )
    ) {
      throw new NotAcceptableException(
        'Ce n\'est pas une date de la forme "jj-mm-aaaa"...',
      );
    }

    const d = +toConvert.date.substr(0, 2);
    const m = +toConvert.date.substr(3, 2);
    const yearLength = toConvert.date.length - 6;
    const y = +toConvert.date.substr(6, yearLength);

    if (Math.abs(y) === 0) {
      throw new NotAcceptableException(
        "0 n'a pas sa représentation en chiffre romain",
      );
    } else if (y < -4999) {
      throw new NotAcceptableException(
        'Ne sait pas convertir un nombre plus petit que -4999 en romain...',
      );
    } else if (y > 4999) {
      throw new NotAcceptableException(
        'Ne sait pas convertir un nombre plus grand que 4999 en romain...',
      );
    } else if (!isValidDate(d, m, y)) {
      throw new NotFoundException("Cette date n'existe pas...");
    }

    let negYear = y < 0 ? '-' : '';

    const romanDate =
      this.romanize(d) +
      '-' +
      this.romanize(m) +
      '-' +
      negYear +
      this.romanize(Math.abs(y));

    return {
      date:
        d.toString().padStart(2, '0') +
        '-' +
        m.toString().padStart(2, '0') +
        '-' +
        y,
      dateRomanized: romanDate,
    };
  }
}
