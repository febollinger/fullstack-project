import { Request, Response } from "express";
import { Token, createLogin, returnLogin } from "../../interfaces";
import { createContactLoginService } from "../../services/login/contactLogin.service";

const createLoginContactController = async (req: Request, resp: Response) => {
    const data: createLogin = req.body

    const logginContact = await createContactLoginService(data)

    return resp.json({
        token: logginContact
    })
}

export {
    createLoginContactController
}