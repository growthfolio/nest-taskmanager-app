import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Project } from "../entities/project.entity";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) { }

    async findAll(): Promise<Project[]> {
        return await this.projectRepository.find({
            relations: {
                task: true
            }
        });
    }

    async findById(id: number): Promise<Project> {

        let project = await this.projectRepository.findOne({
            where: {
                id
            },
            relations: {
                task: true
            }
        });

        if (!project)
            throw new HttpException('Project not Found!', HttpStatus.NOT_FOUND);

        return project;
    }

    async findByTitle(title: string): Promise<Project[]> {
        return await this.projectRepository.find({
            where: {
                title: ILike(`%${title}%`)
            },
            relations: {
                task: true
            }
        })
    }

    async create(Project: Project): Promise<Project> {
        return await this.projectRepository.save(Project);
    }

    async update(project: Project): Promise<Project> {

        let projectExists = await this.findById(project.id);

        if (!projectExists || !project.id)
            throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);

        return await this.projectRepository.save(project);
    }

    async delete(id: number): Promise<DeleteResult> {

        let projectExists = await this.findById(id);

        if (!projectExists)
            throw new HttpException('Project not found!', HttpStatus.NOT_FOUND);

        return await this.projectRepository.delete(id);

    }

}