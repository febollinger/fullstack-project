import { getRounds, hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";
import Client from "./clients.entity";

@Entity('contact')
class Contact{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({type:'date'})
    createdAt: string

    @Column({type:'varchar', length:60})
    name: string

    @Column({type:'varchar', length:80, unique:true})
    email: string

    @Column({type:'varchar', length:150})
    password: string

    @Column({type:'varchar', length:11})
    number: string

    @ManyToOne(() => Client, {
        onDelete: "CASCADE",
        nullable:true
    })
    client: Client

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isHashed = getRounds(this.password)
        if(!isHashed){
            this.password = hashSync(this.password, 9)
        }
    }
}

export default Contact