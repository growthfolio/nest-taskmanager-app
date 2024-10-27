import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { Task } from "../entities/task.entity";
import { TaskService } from "../services/task.service";

@Controller("/tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findById(id);
    }
}