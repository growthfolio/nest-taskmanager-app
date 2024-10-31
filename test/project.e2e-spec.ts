import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Project Module (e2e)', () => {
  
  let app: INestApplication;
  let token: string;
  let projectId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Criando um usuário para autenticação nos testes
    await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Test User',
        email: 'test@project.com',
        password: 'password',
        photo: '-'
      })
      .expect(201);

    // Authen
    const authResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'test@project.com', password: 'password' })
      .expect(200);

    token = authResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Should create a new project', async () => {
    const response = await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `${token}`)
      .send({
        title: 'New Project',
        description: 'Project Description',
      })
      .expect(201);

    projectId = response.body.id;
    expect(response.body.title).toEqual('New Project');
    expect(response.body.description).toEqual('Project Description');
  });

  it('02 - Should find a project by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/projects/${projectId}`)
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body.id).toEqual(projectId);
    expect(response.body.title).toEqual('New Project');
  });

  it('03 - Should find projects by title', async () => {
    const response = await request(app.getHttpServer())
      .get('/projects/title/New')
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toContain('New Project');
  });

  it('04 - Should update an existing project', async () => {
    const response = await request(app.getHttpServer())
      .put('/projects')
      .set('Authorization', `${token}`)
      .send({
        id: projectId,
        title: 'Updated Project',
        description: 'Updated Description',
      })
      .expect(200);

    expect(response.body.title).toEqual('Updated Project');
    expect(response.body.description).toEqual('Updated Description');
  });

  it('05 - Should delete a project by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/projects/${projectId}`)
      .set('Authorization', `${token}`)
      .expect(204);

    // Verify if the project was deleted
    await request(app.getHttpServer())
      .get(`/projects/${projectId}`)
      .set('Authorization', `${token}`)
      .expect(404);
  });
});