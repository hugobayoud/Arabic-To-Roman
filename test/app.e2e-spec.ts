import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/arabic-to-roman (GET)', () => {
    return request(app.getHttpServer())
      .get('/arabic-to-roman')
      .expect(200)
      .expect('Solution proposée par Hugo BAYOUD pour le test technique : concevoir une API REST qui recoit une date en chiffres arabes et la retourne en chiffres romains');
  });
});
