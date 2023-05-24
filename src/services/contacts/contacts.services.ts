import { DeepPartial, Repository } from "typeorm";

import Contact from "../../entities/contacts.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";
import { allContactsReturn, contactReturn, updateContact } from "../../interfaces/contact.interface";
import { returnAllContactsSchema, returnContactSchema } from "../../schemas/contact/contacts.schema";

const createContactService = async (data: DeepPartial<Contact>): Promise<contactReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const creating = contactRepository.create({
        ...data
    })

    await contactRepository.save(creating)

    return returnContactSchema.parse(creating)
}

const listAllContactsService = async (): Promise<allContactsReturn> => {
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findContacts: Contact[]= await contactRepository.find()

    return returnAllContactsSchema.parse(findContacts)
}

const editContactService = async (data: updateContact,contactUuid: string): Promise<contactReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findingContact: Contact | null = await contactRepository.findOne({
        where:{
            id:contactUuid
        }
    })

    const contactUpdate = contactRepository.create({
        ...findingContact,
        ...data
    })

    await contactRepository.save(contactUpdate)

    return returnContactSchema.parse(contactUpdate)

}

const deleteContactService = async (contactUuid: string): Promise<void> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findingContact: Contact | null = await contactRepository.findOne({
        where:{
            id: contactUuid
        }
    })

    if(!findingContact){
        throw new AppError("Client not found", 400)
    }

    await contactRepository.remove(findingContact)


}

export {
    createContactService,
    listAllContactsService,
    editContactService,
    deleteContactService
}