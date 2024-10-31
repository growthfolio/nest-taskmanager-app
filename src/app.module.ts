import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env' : '.env.dev',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'development-user'),
        password: configService.get<string>('DB_PASSWORD', 'development-pass'),
        database: configService.get<string>('DB_DATABASE', 'db_taskmanager'),
        entities: [Task, Project, User],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true),
        timezone: configService.get<string>('DB_TIMEZONE', 'Z'),
      }),
    }),
    TaskModule,
    ProjectModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
