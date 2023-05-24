import { DeepPartial } from "typeorm";
import {z} from "zod";

import Contact from "../entities/contacts.entity";
import { createContactSchema, returnAllContactsSchema, returnContactSchema } from "../schemas/contact/contacts.schema";

type contactCreate = z.infer<typeof createContactSchema>
type contactReturn = z.infer<typeof returnContactSchema>
type updateContact = DeepPartial<Contact>
type allContactsReturn = z.infer<typeof returnAllContactsSchema>

export {
    contactCreate,
    contactReturn,
    updateContact,
    allContactsReturn
}