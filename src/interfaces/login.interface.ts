import { z } from "zod";
import { createLoginSchema, returnLoginArSchema, returnLoginSchema } from "../schemas/login/login.schema";

type createLogin = z.infer<typeof createLoginSchema>
type returnLogin = z.infer<typeof returnLoginSchema>
type returnLoginAr = z.infer<typeof returnLoginArSchema>

interface Token{
    token: string
}

export {
    createLogin,
    returnLogin,
    returnLoginAr,
    Token
}