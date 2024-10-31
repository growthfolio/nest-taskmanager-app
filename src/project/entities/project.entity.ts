import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../../task/entities/task.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_projects"})
export class Project {

    @PrimaryGeneratedColumn()   
    @ApiProperty() 
    id: number

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    description: string

    @CreateDateColumn({name: "creation_date"})
    @ApiProperty()
    creationDate: Date;
    
    @UpdateDateColumn({name: "last_update"})
    @ApiProperty()
    lastUpdate: Date;
    
    @ApiProperty()
    @OneToMany(() => Task, (task) => task.project)
    task: Task[] 

}