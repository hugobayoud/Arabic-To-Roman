import { Test, TestingModule } from '@nestjs/testing';
import { removeAllListeners } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('Should return a quick description', () => {
    expect(appController.getAbout()).toBe(
      'Solution proposée par Hugo BAYOUD pour le test technique : concevoir une API REST qui recoit une date en chiffres arabes et la retourne en chiffres romains',
    );
  });

  it('Should throw notAcceptableException with a customized message when an empty date is passed', () => {
    try {
      appService.convertToRoman({ date: ' ' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe(
        'Ce n\'est pas une date de la forme "jj-mm-aaaa"...',
      );
    }
  });

  it('Should throw notAcceptableException with a customized message when no date format passed', () => {
    try {
      appService.convertToRoman({ date: '2020' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe(
        'Ce n\'est pas une date de la forme "jj-mm-aaaa"...',
      );
    }
  });

  it('Should throw notFoundException with a customized message when no date passed', () => {
    try {
      appService.convertToRoman({ date: null });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Aucune date en entrée...');
    }
  });

  it('Should return the date romanized', () => {
    expect(appService.convertToRoman({ date: '13-02-1998' })).toStrictEqual({
      date: '13-02-1998',
      dateRomanized: 'XIII-II-MCMXCVIII',
    });
  });

  // 2020 is a bisextile year. Then, 29-02-2020 is a valid date
  it('Should return the date romanized because it is a valid date in a bisextile year', () => {
    expect(appService.convertToRoman({ date: '29-02-2020' })).toStrictEqual({
      date: '29-02-2020',
      dateRomanized: 'XXIX-II-MMXX',
    });
  });

  // 2019 is not a bisextile year. Then, 29-02-2020 is not a valid date
  it('Should throw notFoundException because it is an invalid date in a no bisextile year', () => {
    try {
      appService.convertToRoman({ date: '29-02-2019' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Cette date n'existe pas...");
    }
  });

  //EXTREME CASES

  it('Should return the good date romanized 1', () => {
    expect(appService.convertToRoman({ date: '31/12/-4999' })).toStrictEqual({
      date: '31-12--4999',
      dateRomanized: 'XXXI-XII-MMMMCMXCIX',
    });
  });

  it('Should return the good date romanized 2', () => {
    expect(appService.convertToRoman({ date: '12/05/-192' })).toStrictEqual({
      date: '12-05--192',
      dateRomanized: 'XII-V-CXCII',
    });
  });

  it('Should return the good date romanized 3', () => {
    expect(appService.convertToRoman({ date: '31-12-4999' })).toStrictEqual({
      date: '31-12-4999',
      dateRomanized: 'XXXI-XII-MMMMCMXCIX',
    });
  });

  it('Should return the good date romanized 4', () => {
    expect(appService.convertToRoman({ date: '01-01-1' })).toStrictEqual({
      date: '01-01-1',
      dateRomanized: 'I-I-I',
    });
  });

  it('Should throw an error because of an invalid date (month)', () => {
    try {
      appService.convertToRoman({ date: '31/-12/-192' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe(
        'Ce n\'est pas une date de la forme "jj-mm-aaaa"...',
      );
    }
  });

  it('Should throw an error because of an invalid date (day and month equal to 0)', () => {
    try {
      appService.convertToRoman({ date: '00/00/-192' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Cette date n'existe pas...");
    }
  });

  it('Should throw an error because 0 does not exist in roman', () => {
    try {
      appService.convertToRoman({ date: '12/05/0' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("0 n'a pas sa représentation en chiffre romain");
    }
  });

  it('Should throw an error because of an out of range date (year) left', () => {
    try {
      appService.convertToRoman({ date: '31/12/-5000' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe(
        'Ne sait pas convertir un nombre plus petit que -4999 en romain...',
      );
    }
  });

  it('Should throw an error because of an out of range date (year) right', () => {
    try {
      appService.convertToRoman({ date: '31/12/5000' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe(
        'Ne sait pas convertir un nombre plus grand que 4999 en romain...',
      );
    }
  });
});
