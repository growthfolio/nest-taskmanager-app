import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { Task } from "./entities/task.entity";
import { ProjectService } from "../project/services/project.service";
import { ProjectModule } from "../project/project.module";



@Module({
    imports: [TypeOrmModule.forFeature([Task]), ProjectModule],
    providers: [TaskService, ProjectService],
    controllers: [TaskController],
    exports: [TypeOrmModule]
})
export class TaskModule {}