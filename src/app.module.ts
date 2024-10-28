import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_taskmanager',
      entities: [Task, Project],
      synchronize: true,
      timezone: 'Z',
    }),
    TaskModule,
    ProjectModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
