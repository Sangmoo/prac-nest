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

  // Url Test - end to end Test
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });


  // e2e Test AppController
  describe("/movies", () => {
     // getOne
  it('/movies (GET)', () => {
    return request(app.getHttpServer())
    .get('/movies')
    .expect(200) // Http Status Code
    .expect([{ id : 1}]);
  });
  // Create
  it("POST", () => {
    return request(app.getHttpServer())
    .post('/movies')
    .send({
      title: 'Test',
      year: 2020,
      genres: ['Test'],
    })
    .expect(201);
  });
  // Delete
  it("DELETE", () => {
    return request(app.getHttpServer())
    .delete('/movies')
    .expect(404);
  })
  });
   

});
