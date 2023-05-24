import 'dotenv/config';
import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken';
import { Repository } from "typeorm";

import { Token, createLogin } from "../../interfaces";
import Client from "../../entities/clients.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";



const createClientLoginService = async (data: createLogin): Promise<Token | string> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findingClient: Client | null = await clientRepository.findOneBy({
        email: data.email
    })

    if(!findingClient){
        throw new AppError("Wrong email or password", 401)
    }

    const pass = await compare(data.password, findingClient.password)

    if(!pass){
        throw new AppError('Wrong email or password', 401);
    }

    const token = jwt.sign(
        {
            clientUuid: findingClient.id
        },
        process.env.SECRET_KEY!,
        {
            expiresIn:"24hrs",
            subject: findingClient.id!
        }
    )

    return token

}

export {createClientLoginService}