import { DeepPartial, Repository } from "typeorm";

import Client from "../../entities/clients.entity";

import AppDataSource from "../../data-source";
import { returnAllClientsSchema, returnClientSchema } from "../../schemas/client/clients.schema";
import { AppError } from "../../errors";
import { allClientsReturn, clientReturn, updateClient } from "../../interfaces";

const createClientService = async (data: DeepPartial<Client>): Promise<clientReturn> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const creating = clientRepository.create({
        ...data
    })

    await clientRepository.save(creating)

    return returnClientSchema.parse(creating)
}

const listAllClientsService = async (): Promise<allClientsReturn> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findClients: Client[]= await clientRepository.find()

    return returnAllClientsSchema.parse(findClients)
}

const editClientService = async (data: updateClient,clientId: number): Promise<clientReturn> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findingClient: Client | null = await clientRepository.findOne({
        where:{
            id:clientId
        }
    })

    const clientUpdate = clientRepository.create({
        ...findingClient,
        ...data
    })

    await clientRepository.save(clientUpdate)

    return returnClientSchema.parse(clientUpdate)

}

const deleteClientService = async (clientUiid: number): Promise<void> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findingClient: Client | null = await clientRepository.findOne({
        where:{
            id:clientUiid
        }
    })

    if(!findingClient){
        throw new AppError("Client not found", 400)
    }

    await clientRepository.remove(findingClient)


}

export {
    createClientService,
    listAllClientsService,
    editClientService,
    deleteClientService
}