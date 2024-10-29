import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { ProjectService } from "../../project/services/project.service";


@Injectable()
export class TaskService {
    // Construtor, que receberá as Injeções de Dependência necessárias 
    // para o desenvolvimento da Classe de Serviço.
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private projectService: ProjectService
    ) { }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find({
            relations: {
                project: true,
                user: true
            }
        });
    }

    async findById(id: number): Promise<Task> {
        
        let task = await this.taskRepository.findOne({
            where: { 
                id
            },
            relations: {
                project: true,
                user: true
            }
        });

        if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return task;
    }
    
    async findByTitle(title: string): Promise<Task[]> {
        return await this.taskRepository.find({
            where: { 
                title: ILike(`%${title}%`) //searching for a title that contains the string(is case INsensitive)
             },
             relations: {
                project: true,
                user: true
            }
        });
    }

    async findByStatus(status: string): Promise<Task[]> {
        return await this.taskRepository.find({
            where: { 
                status 
            },
            relations: {
                project: true,
                user: true
            }
        });
    }

    async create(task: Task): Promise<Task> {
        if (task.project) {

            let project = await this.projectService.findById(task.project.id);

            if (!project) 
                throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
            
            return await this.taskRepository.save(task);   

        }
        return await this.taskRepository.save(task);
    }

    async update(task: Task): Promise<Task> {
        let taskExists: Task = await this.findById(task.id);

        if (!taskExists || !task.id)
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        
        if (task.project) {
            let project = await this.projectService.findById(task.project.id);

            if (!project) 
                throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
     
            return await this.taskRepository.save(task);
        }
        
        return await this.taskRepository.save(task);
    }

    async delete(id: number): Promise<DeleteResult> {
        let taskExists = await this.findById(id);

        if (!taskExists) 
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

        return await this.taskRepository.delete(id);
    }
}


