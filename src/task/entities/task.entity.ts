import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_tasks"})
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "title", length: 100})
    @IsNotEmpty({message: "The field 'title' cannot be empty"})
    titulo: string;

    @Column({name: "description", length: 255})
    descricao: string;

    @Column({name: "status", length: 20})
    status: string;

    @Column({name: "creation_date"})
    dataCriacao: Date;

    // @UpdateDateColumn({name: "data_atualizacao"})
    // dataAtualizacao: Date;
}