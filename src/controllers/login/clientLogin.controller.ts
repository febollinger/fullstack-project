import { Request, Response } from "express"
import { createLogin } from "../../interfaces"
import { createClientLoginService } from "../../services/login/clientLogin.service"

const createClientLoginController = async (req: Request, resp: Response) => {
    const data: createLogin = req.body

    const loginService = await createClientLoginService(data)

    return resp.json({
        token:loginService
    })
}

export {
    createClientLoginController
}