import { Router } from "express";

import { createClientLoginController } from "../../controllers/login/clientLogin.controller";

const loginRouters: Router = Router()

loginRouters.post("", createClientLoginController)


export default loginRouters