import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a quick description', () => {
      expect(appController.getAbout()).toBe('Solution proposée par Hugo BAYOUD pour le test technique : concevoir une API REST qui recoit une date en chiffres arabes et la retourne en chiffres romains');
    });
  });

//   describe('simple test with a number type', () => {
//     it('should return MMXX to the year 2020', () => {
//       expect(appController.convertToRoman({date: 2020})).toMatchObject({date: 2020, dateRomanized: "MMXX"});
//     });
//   });

//   describe('simple test with a string type but a number', () => {
//     it('should return MMXX to the year 2020', () => {
//       expect(appController.convertToRoman({date: +"2020"})).toMatchObject({date: 2020, dateRomanized: "MMXX"});
//     });
//   });

//   describe('simple test with a string type and not a number', () => {
//     it('should return that the date is not a number', () => {
//       expect(appController.convertToRoman({date: +" "})).toThrowError('Aucune date en entrée...');
//     });
//   });
});
