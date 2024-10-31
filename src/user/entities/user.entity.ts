import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Task } from "../../task/entities/task.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn() 
    @ApiProperty() 
    id: number

    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false}) 
    name: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false })
    email: string

    @MinLength(8)
    @IsNotEmpty()
    @ApiProperty() 
    @Column({length: 255, nullable: false }) 
    password: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    photo: string

    @ApiProperty() 
    @OneToMany(() => Task, (task) => task.user)
    task: Task[]

}