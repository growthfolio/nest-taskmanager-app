import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Tests to Modules User and Auth (e2e)', () => {
  
  let token: any;
  let userId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
      }),        
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });
  
  it("01 - Deve Cadastrar um novo Usuário", async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Root',
        email: 'root@root.com',
        password: 'rootroot',
        photo: '-',
      })
      .expect(201)

    userId = response.body.id;

  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Root',
        email: 'root@root.com',
        password: 'rootroot',
        photo: '-',
      })
      .expect(400)

  });

  it("03 - Deve Autenticar o Usuário (Login)", async () => {
    const response = await request(app.getHttpServer())
    .post("/users/login")
    .send({
      email: 'root@root.com',
      password: 'rootroot',
    })
    .expect(200)

    token = response.body.token;

  })

  it("04 - Deve Listar todos os Usuários", async () => {
    return request(app.getHttpServer())
    .get('/users/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  // TODO: Fix this test
  //
  // it("05 - Deve Atualizar um Usuário", async () => {
  //   return request(app.getHttpServer())
  //   .put('/users/update')
  //   .set('Authorization', `${token}`)
  //   .send({
  //     id: userId,
  //     name: 'Root Atualizado',
  //     email: 'root@root.com',
  //     password: 'rootroot',
  //     photo: '-',
  //   })
  //   .expect(200)
  //   .then( response => {
  //     expect("Root Atualizado").toEqual(response.body.name);
  //   })

  // })

});
