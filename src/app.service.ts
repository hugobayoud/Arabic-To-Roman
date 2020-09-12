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
		let lookup = {M:1000 ,CM:900, D:500 ,CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};
		let roman = '';
		let i = null;

		for (i in lookup) {
		  while ( number >= lookup[i] ) {
			roman += i;
			number -= lookup[i];
		  }
		}
		return roman;
	}

	/**
	 * 
	 * @param toConvert : JSON qui contient la date en chiffres arabes
	 * @return : JSON avec la date en chiffres arabes et son équivalent en chiffres romains 
	 */
	convertToRoman(toConvert: ToConvert) {
		return {
			date: +toConvert.date, 
			dateRomanized: this.romanize(+toConvert.date)
		};
	}
}