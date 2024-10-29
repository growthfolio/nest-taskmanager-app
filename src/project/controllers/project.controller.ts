import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Project } from "../entities/project.entity";
import { ProjectService } from "../services/project.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("/projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  findBytitle(@Param('title') title: string): Promise<Project[]> {
    return this.projectService.findByTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() project: Project): Promise<Project> {
    return this.projectService.create(project);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() project: Project): Promise<Project> {
    return this.projectService.update(project);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.projectService.delete(id);
  }

}