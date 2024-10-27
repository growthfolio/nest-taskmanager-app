import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "../../project/entities/project.entity";

@Entity({name: "tb_tasks"})
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "title", length: 100})
    @IsNotEmpty({message: "The field 'title' cannot be empty"})
    title: string;

    @Column({name: "description", length: 255})
    description: string;

    @Column({name: "status",default: 'pending', length: 20})
    status: string;

    @CreateDateColumn({name: "creation_date"})
    creationDate: Date;

    @UpdateDateColumn({name: "last_update"})
    lastUpdate: Date;

    @ManyToOne(() => Project, (project) => project.task,{
        onDelete: "CASCADE"
    // onUpdate: "CASCADE"
})
    project: Project;
}