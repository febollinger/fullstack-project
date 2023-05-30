import { Request, Response } from "express";
import { DeepPartial } from "typeorm";

import Contact from "../../entities/contacts.entity";
import { updateClient } from "../../interfaces/client.interface";
import { AppError } from "../../errors";
import { createContactService, deleteContactService, editContactService, listAllContactsService } from "../../services/contacts/contacts.services";
import { updateContact } from "../../interfaces/contact.interface";

const createContactController = async (req: Request, resp: Response): Promise<Response> => {
    const bodyData: DeepPartial<Contact> = req.body
    const clientId: number | undefined = req.auth.clientId!



    return resp.status(201).json(await createContactService(bodyData, clientId))
}

const readAllContactsController = async (req:Request, resp:Response): Promise<Response> => {
    const clientId: number | undefined = req.auth.clientId!
    const getContacts = await listAllContactsService(clientId)

    return resp.status(200).json(getContacts)
}

const editContactController = async (req: Request, resp: Response): Promise<Response> => {
    const contactId: number | undefined = Number(req.params.id)
    const clientId: number= req.auth.clientId!
    const bodyData: updateContact = req.body

    if(!contactId){
        throw new AppError("Contact not found", 400)
    }

    const contactUpdating = await editContactService(bodyData, contactId, clientId)

    return resp.status(200).json(contactUpdating)

}

const deleteContactController = async (req: Request, resp: Response): Promise<Response> => {
    const getContact: number | undefined = Number(req.params.id)
    
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