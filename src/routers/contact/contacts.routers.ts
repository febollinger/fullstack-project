import { Router } from "express";
import { ensureClientTokenIsValid, ensureContactTokenIsValid, ensureDataIsValid, ensureEmailExist } from "../../middlewares";
import { createContactSchema, updateContactSchema } from "../../schemas/contact/contacts.schema";
import { createContactController, deleteContactController, editContactController, readAllContactsController } from "../../controllers/contacts/contacts.controllers";

const contactRouters: Router = Router()

contactRouters.post("", ensureDataIsValid(createContactSchema), ensureEmailExist, ensureClientTokenIsValid, createContactController)

contactRouters.get("", readAllContactsController)

contactRouters.patch("", ensureContactTokenIsValid, ensureDataIsValid(updateContactSchema), ensureEmailExist, editContactController)

contactRouters.delete("", ensureClientTokenIsValid, deleteContactController)

export default contactRouters