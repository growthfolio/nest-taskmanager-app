import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "../../project/entities/project.entity";
import { User } from "../../user/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_tasks"})
export class Task {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({name: "title", length: 100})
    @IsNotEmpty({message: "The field 'title' cannot be empty"})
    title: string;

    @ApiProperty()
    @Column({name: "description", length: 255})
    description: string;

    @ApiProperty()
    @Column({name: "status",default: 'pending', length: 20})
    status: string;

    @ApiProperty()
    @CreateDateColumn({name: "creation_date"})
    creationDate: Date;

    @ApiProperty()
    @UpdateDateColumn({name: "last_update"})
    lastUpdate: Date;

    @ApiProperty({type: () => Project})
    @ManyToOne(() => Project, (project) => project.task,{
        onDelete: "CASCADE"
    })
    project: Project;

    @ApiProperty({type: () => User})
    @ManyToOne(() => User, (user) => user.task,{
        onDelete: "CASCADE"
    })
    user: User;
}