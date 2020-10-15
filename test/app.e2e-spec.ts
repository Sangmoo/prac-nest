import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // e2e Test이던, Unit Test던
    // Test 환경도 App 환경이랑 같게 설정해야 한다.
    // Pipe - MiddleWare
    app.useGlobalPipes(new ValidationPipe({
    // 아무 Decorator도 없는 obj는 거른다.
    whitelist: true,
    // 잘못된 Req 요청 처리 x
    forbidNonWhitelisted: true,
    // Type 변환
    transform: true,
  }));
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

  // 400 Error Patch Method
  it("POST 400", () => {
    return request(app.getHttpServer())
    .post('/movies')
    .send({
      title: 'Test',
      year: 2020,
      genres: ['Test'],
      other: "thing",
    })
    .expect(400);
  });
  // Delete
  it("DELETE", () => {
    return request(app.getHttpServer())
    .delete('/movies')
    .expect(404);
  })
  });
   
  // Get, Delete, Patch Method - All for one
  describe('/movies/:id', () => {
    it.todo("GET 200", () => {
      return request(app.getHttpServer()).get("/movies/1").expect(200);
    })
    it.todo("GET 404", () => {
      return request(app.getHttpServer()).get("/movies/999").expect(404);
    })
    it.todo("PATCH 200", () => {
      return request(app.getHttpServer()).patch('/movies/1').send({title: 'Update Title'}).expect(200);
    })
    it.todo("DELETE 200", () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    })
    
  })

});
