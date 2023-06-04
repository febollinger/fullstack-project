import { Router } from "express";

import { createClientSchema, updateClientSchema } from "../../schemas/client/clients.schema";
import { ensureClientTokenIsValid, ensureDataIsValid, ensureEmailExist } from "../../middlewares";
import { createClientController, deleteClientController, editClientController, readAllClientsController } from "../../controllers/clients/clients.controllers";
import { createContactSchema } from "../../schemas/contact/contacts.schema";
import { createContactController, deleteContactController, editContactController, getOneContactController, readAllContactsController } from "../../controllers/contacts/contacts.controllers";



const clientRouters: Router = Router()

clientRouters.post("", ensureDataIsValid(createClientSchema), ensureEmailExist,createClientController)

clientRouters.get("", ensureClientTokenIsValid,readAllClientsController)

clientRouters.patch("/:id", ensureClientTokenIsValid,ensureDataIsValid(updateClientSchema), ensureEmailExist,editClientController)

clientRouters.delete("/:id", ensureClientTokenIsValid,deleteClientController)

//contatos
clientRouters.post("/contact", ensureClientTokenIsValid,ensureDataIsValid(createContactSchema), ensureEmailExist,createContactController)

clientRouters.get("/contact", ensureClientTokenIsValid, readAllContactsController)

clientRouters.patch("/contact/:id", ensureClientTokenIsValid,ensureDataIsValid(updateClientSchema), ensureEmailExist,editContactController)

clientRouters.get("/contact/:id", ensureClientTokenIsValid, getOneContactController)

clientRouters.delete("/contact/:id", ensureClientTokenIsValid, deleteContactController)


export default clientRouters