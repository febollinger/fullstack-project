import { Router } from "express";
import { createClientLoginController } from "../../controllers/login/clientLogin.controller";
import { createLoginContactController } from "../../controllers/login/contactLogin.controller";

const loginRouters: Router = Router()

loginRouters.post("/client", createClientLoginController)
loginRouters.post("/contact", createLoginContactController)

export default loginRouters