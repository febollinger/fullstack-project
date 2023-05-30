import { Request, Response } from "express";
import { DeepPartial } from "typeorm";
import Client from "../../entities/clients.entity";
import { createClientService, deleteClientService, editClientService, listAllClientsService } from "../../services/clients/clients.services";
import { updateClient } from "../../interfaces/client.interface";
import { AppError } from "../../errors";

const createClientController = async (req: Request, resp: Response): Promise<Response> => {
    const bodyData: DeepPartial<Client> = req.body

    return resp.status(201).json(await createClientService(bodyData))
}

const readAllClientsController = async (req:Request, resp:Response): Promise<Response> => {
    const getClients = await listAllClientsService()

    return resp.status(200).json(getClients)
}

const editClientController = async (req: Request, resp: Response): Promise<Response> => {
    const getClient: number | undefined = req.auth.clientId
    const bodyData: updateClient = req.body

    if(!getClient){
        throw new AppError("Unauthorized", 401)
    }

    const clientUpdating = await editClientService(bodyData, getClient)

    return resp.status(200).json(clientUpdating)

}

const deleteClientController = async (req: Request, resp: Response): Promise<Response> => {
    const getClient: number | undefined = req.auth.clientId
    
    if(!getClient){
        throw new AppError("Unauthorized", 401)
    }

    await deleteClientService( getClient)

    return resp.status(204).send()

}

export {
    createClientController,
    readAllClientsController,
    editClientController,
    deleteClientController
}