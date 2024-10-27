import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Task } from "../entities/task.entity";


@Injectable()
export class TaskService {
    // Construtor, que receberá as Injeções de Dependência necessárias 
    // para o desenvolvimento da Classe de Serviço.
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findById(id: number): Promise<Task> {
        
        let task = await this.taskRepository.findOne({
            where: { id }
        });

        if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return task;
    }
    
    async findByTitle(title: string): Promise<Task> {
        return await this.taskRepository.findOne({
            where: { 
                title: ILike(`%${title}%`) //searching for a title that contains the string(is case INsensitive)
             }
        });
    }
    async findByStatus(status: string): Promise<Task[]> {
        return await this.taskRepository.find({
            where: { status }
        });
    }
}


