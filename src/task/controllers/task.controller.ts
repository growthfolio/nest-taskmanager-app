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

    @Get("/title/:title")
    @HttpCode(HttpStatus.OK)
    findByTitle(@Param("title") title: string): Promise<Task> {
        return this.taskService.findByTitle(title);
    }

    @Get("/status/:status")
    @HttpCode(HttpStatus.OK)
    findByStatus(@Param("status") status: string): Promise<Task[]> {
        return this.taskService.findByStatus(status);
    }
}