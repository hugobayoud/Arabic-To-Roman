import { Injectable } from '@nestjs/common';
import { ToConvert } from './interface/to-convert.interface';

@Injectable()
export class AppService {
	about() {
		return "Solution proposée par Hugo BAYOUD pour le test technique : concevoir une API REST qui recoit une date en chiffres arabes et la retourne en chiffres romains"
	}

	// Conversion vers chiffres romains
	/**
	 * 
	 * @param number : nombre en chiffres arabes à convertir
	 * @return string : conversion sous forme de chaine de caractères 
	 */
	romanize(number: number): string {
		let romanizedNumber = '';
		let sym = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};

		for (let i in sym) {
		  while ( number >= sym[i] ) {
			romanizedNumber += i;
			number -= sym[i];
		  }
		}
		return romanizedNumber;
	}

	/**
	 * 
	 * @param toConvert : JSON qui contient la date en chiffres arabes de la forme "dd-mm-aaa"
	 * @return : JSON avec la date en chiffres arabes et son équivalent en chiffres romains 
	 */
	convertToRoman(toConvert: ToConvert) {
		const day = +toConvert.date.substr(0, 2);
		const month = +toConvert.date.substr(3, 2);
		const year = +toConvert.date.substr(6, 4);

		const romanDate = this.romanize(day) + "-" + this.romanize(month) + "-" + this.romanize(year);

		return {
			date: toConvert.date, 
			dateRomanized: romanDate
		};
	}
}