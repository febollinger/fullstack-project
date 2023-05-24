import { Router } from "express";

import { createClientSchema, updateClientSchema } from "../../schemas/client/clients.schema";
import { ensureClientTokenIsValid, ensureDataIsValid, ensureEmailExist } from "../../middlewares";
import { createClientController, deleteClientController, editClientController, readAllClientsController } from "../../controllers/clients/clients.controllers";



const clientRouters: Router = Router()

clientRouters.post("", ensureDataIsValid(createClientSchema), ensureEmailExist,createClientController)

clientRouters.get("", ensureClientTokenIsValid,readAllClientsController)

clientRouters.patch("/:id", ensureClientTokenIsValid,ensureDataIsValid(updateClientSchema), ensureEmailExist,editClientController)

clientRouters.delete("/:id", ensureClientTokenIsValid,deleteClientController)

export default clientRouters