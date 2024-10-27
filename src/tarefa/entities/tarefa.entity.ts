import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_tarefas"})
export class Tarefa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "titulo", length: 100})
    @IsNotEmpty({message: "O campo 'titulo' é obrigatório"})
    titulo: string;

    @Column({name: "descricao", length: 255})
    descricao: string;

    @Column({name: "status", length: 20})
    status: string;

    @Column({name: "data_criacao"})
    dataCriacao: Date;

    // @UpdateDateColumn({name: "data_atualizacao"})
    // dataAtualizacao: Date;
}