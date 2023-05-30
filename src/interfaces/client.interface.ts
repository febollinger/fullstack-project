import { DeepPartial } from "typeorm";
import {z} from "zod";

import { createClientSchema, returnAllClientsSchema, returnClientSchema } from "../schemas/client/clients.schema";
import Client from "../entities/clients.entity";

type clientCreate = z.infer<typeof createClientSchema>
type clientReturn = z.infer<typeof returnClientSchema>
type updateClient = DeepPartial<Client>
type allClientsReturn = z.infer<typeof returnAllClientsSchema>

export {
    clientCreate,
    clientReturn,
    updateClient,
    allClientsReturn
}