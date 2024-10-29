import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Task } from "../../task/entities/task.entity"

@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    name: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    email: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    password: string

    @Column({length: 5000 }) 
    photo: string

    @OneToMany(() => Task, (task) => task.user)
    task: Task[]

}