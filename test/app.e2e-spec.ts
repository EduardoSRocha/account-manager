import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //Criar a aplicação apenas uma vez antes de iniciar os testes e2e
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', process.env.API_KEY) // 👈
      .expect(200)
      .expect({ server: 'on' });
  });

  //Finalizar completamente a aplicação após terminar os testes
  afterAll(async () => {
    await app.close();
  });
});
