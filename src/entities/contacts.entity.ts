import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

import Client from "./clients.entity";

@Entity('contact')
class Contact{
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({type:'date'})
    createdAt: string

    @Column({type:'varchar', length:60})
    name: string

    @Column({type:'varchar', length:80, unique:true})
    email: string

    @Column({type:'varchar', length:11})
    number: string

    @ManyToOne(() => Client, {
        onDelete: "CASCADE",
        nullable:true
    })
    client: Client

}

export default Contact