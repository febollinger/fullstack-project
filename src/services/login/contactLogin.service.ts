import 'dotenv/config';
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Repository } from "typeorm";

import { Token, createLogin } from '../../interfaces';
import Contact from '../../entities/contacts.entity';
import AppDataSource from '../../data-source';
import { AppError } from '../../errors';

const createContactLoginService = async (data: createLogin): Promise<Token | string> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findingContact: Contact | null = await contactRepository.findOne({
        where:{
            email: data.email
        }
    })

    if(!findingContact){
        throw new AppError("Wrong email or password", 401)
    }

    const findingPass= await compare(data.password, findingContact.password)

    if(!findingPass){
        throw new AppError("Wrong email or password", 401)
    }

    const token = jwt.sign(
        {
            contactUuid : findingContact.id
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN!,
            subject:findingContact.id!
        }
    )

    return token
}

export {
    createContactLoginService
}