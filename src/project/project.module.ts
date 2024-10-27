import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [],
    controllers: [],
    exports: [TypeOrmModule]
})
export class ProjectModule {}