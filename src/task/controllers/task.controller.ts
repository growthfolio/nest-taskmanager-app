import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Task } from "../entities/task.entity";
import { TaskService } from "../services/task.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Task')
@UseGuards(JwtAuthGuard)
@Controller("/tasks")
@ApiBearerAuth()
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
    findByTitle(@Param("title") title: string): Promise<Task[]> {
        return this.taskService.findByTitle(title);
    }

    @Get("/status/:status")
    @HttpCode(HttpStatus.OK)
    findByStatus(@Param("status") status: string): Promise<Task[]> {
        return this.taskService.findByStatus(status);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() task: Task): Promise<Task> {
        return this.taskService.update(task);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number){
        return this.taskService.delete(id);
    }
    
}