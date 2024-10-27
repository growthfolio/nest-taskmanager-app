import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../../task/entities/task.entity";

@Entity({name: "tb_projects"})
export class Project {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    title: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    description: string

    @CreateDateColumn({name: "creation_date"})
    creationDate: Date;

    @UpdateDateColumn({name: "last_update"})
    lastUpdate: Date;
    task: any;
    
    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

}