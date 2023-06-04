import { DeepPartial, Repository } from "typeorm";

import Contact from "../../entities/contacts.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors";
import { contactReturn, updateContact } from "../../interfaces/contact.interface";
import { returnContactSchema } from "../../schemas/contact/contacts.schema";
import Client from "../../entities/clients.entity";

const createContactService = async (data: DeepPartial<Contact>, clientId: number): Promise<contactReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findUser: Client | null = await clientRepository.findOneBy({
        id: clientId
    })

    const creating = contactRepository.create({ 
        ...data,
        client: findUser!
    })

    await contactRepository.save(creating)

    return returnContactSchema.parse(creating)
}

const listAllContactsService = async (clientId: number): Promise<any> => {
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findContacts = await clientRepository.find({
        where:{
            id: clientId
        },
        relations: {
            contacts:true
        },
        
    })

    console.log(findContacts)
  

    return findContacts
}

const editContactService = async (data: updateContact,contactId: number, clientId:number): Promise<contactReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findContact: Contact | null = await contactRepository.findOneBy({
        id: contactId
    })

    const contactUpdate = contactRepository.create({
        ...findContact,
        ...data
    })

    await contactRepository.save(contactUpdate)

    return returnContactSchema.parse(contactUpdate)

}

const getOneContactService = async (contactId: number): Promise<contactReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findContact: Contact | null = await contactRepository.findOneBy({
        id: contactId
    })


    return returnContactSchema.parse(findContact)

}

const deleteContactService = async (getContact: number): Promise<void> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findingContact: Contact | null = await contactRepository.findOne({
        where:{
            id: getContact
        }
    })

    if(!findingContact){
        throw new AppError("Contact not found", 400)
    }

    await contactRepository.remove(findingContact)


}

export {
    createContactService,
    listAllContactsService,
    editContactService,
    deleteContactService,
    getOneContactService
}