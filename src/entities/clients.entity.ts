import { getRounds, hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import Contact from "./contacts.entity";

@Entity('client')
class Client{
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

    @OneToMany(() => Contact, contact => contact.client)
    contacts: Contact[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isHashed = getRounds(this.password)
        if(!isHashed){
            this.password = hashSync(this.password, 9)
        }
    }
}

export default Client