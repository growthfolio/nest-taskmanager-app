import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ProjectService } from "./services/project.service";
import { ProjectController } from "./controllers/project.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectService],
    controllers: [ProjectController],
    exports: [TypeOrmModule]
})
export class ProjectModule {}