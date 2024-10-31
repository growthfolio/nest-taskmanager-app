import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Task Module (e2e)', () => {
  
  let app: INestApplication;
  let token: string;
  let taskId: number;

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

    // Creatin an user to login and get the token
    await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Test User',
        email: 'test@test.com',
        password: 'password',
        photo: '-'
      })
      .expect(201);

    // Authenticate the user and get the token
    const authResponse = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(200);

    token = authResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Should create a new task', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `${token}`)
      .send({
        title: 'New Task',
        description: 'Task Description',
        status: 'pending',
      })
      .expect(201);

    taskId = response.body.id;
    expect(response.body.title).toEqual('New Task');
    expect(response.body.status).toEqual('pending');
  });

  it('02 - Should find a task by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body.id).toEqual(taskId);
    expect(response.body.title).toEqual('New Task');
  });

  it('03 - Should find tasks by title', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks/title/New')
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toContain('New Task');
  });

  it('04 - Should find tasks by status', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks/status/pending')
      .set('Authorization', `${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].status).toEqual('pending');
  });

  it('05 - Should update an existing task', async () => {
    const response = await request(app.getHttpServer())
      .put('/tasks')
      .set('Authorization', `${token}`)
      .send({
        id: taskId,
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'completed',
      })
      .expect(200);

    expect(response.body.title).toEqual('Updated Task');
    expect(response.body.status).toEqual('completed');
  });

  it('06 - Should delete a task by ID', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `${token}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .set('Authorization', `${token}`)
      .expect(404);
  });
  
});