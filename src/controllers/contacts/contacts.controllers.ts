import { Request, Response } from "express";
import { DeepPartial } from "typeorm";

import Contact from "../../entities/contacts.entity";
import { updateClient } from "../../interfaces/client.interface";
import { AppError } from "../../errors";
import { createContactService, deleteContactService, editContactService, listAllContactsService } from "../../services/contacts/contacts.services";

const createContactController = async (req: Request, resp: Response): Promise<Response> => {
    const bodyData: DeepPartial<Contact> = req.body

    return resp.status(201).json(await createContactService(bodyData))
}

const readAllContactsController = async (req:Request, resp:Response): Promise<Response> => {
    const getContacts = await listAllContactsService()

    return resp.status(200).json(getContacts)
}

const editContactController = async (req: Request, resp: Response): Promise<Response> => {
    const getContact: string | undefined = req.auth.contactUuid
    const bodyData: updateClient = req.body

    if(!getContact){
        throw new AppError("Unauthorized", 401)
    }

    const contactUpdating = await editContactService(bodyData, getContact)

    return resp.status(200).json(contactUpdating)

}

const deleteContactController = async (req: Request, resp: Response): Promise<Response> => {
    const getContact: string | undefined = req.auth.contactUuid
    
    if(!getContact){
        throw new AppError("Unauthorized", 401)
    }

    await deleteContactService( getContact)

    return resp.status(204).send()

}

export {
    createContactController,
    readAllContactsController,
    editContactController,
    deleteContactController
}