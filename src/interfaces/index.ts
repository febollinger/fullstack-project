// Clients interfaces
import { clientCreate } from "./client.interface";
import { clientReturn } from "./client.interface";
import { updateClient } from "./client.interface";
import { allClientsReturn } from "./client.interface";

//login interfaces
import { Token } from "./login.interface";
import { createLogin } from "./login.interface";
import { returnLogin } from "./login.interface";
import { returnLoginAr } from "./login.interface";

export {
    clientCreate,
    clientReturn, updateClient, allClientsReturn,
    Token,
    createLogin,
    returnLogin,
    returnLoginAr
}