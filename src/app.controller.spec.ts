import { 
	Test,
	TestingModule,
} from '@nestjs/testing';
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
});
