import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import Client from "../entities/clients.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors";
import Contact from "../entities/contacts.entity";

const ensureEmailExist = async (req: Request, resp: Response, next: NextFunction) => {
    const getEmail = req.body.email

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const checkingClientEmail = await clientRepository.findOneBy({
        email: getEmail
    })

    const checkingContactEmail = await contactRepository.findOneBy({
        email: getEmail
    })


    if (getEmail && checkingClientEmail ){
        throw new AppError("Email already exists", 409)
    }

    if (getEmail && checkingContactEmail ){
        throw new AppError("Email already exists", 409)
    }

    next()
}

export {
    ensureEmailExist
}