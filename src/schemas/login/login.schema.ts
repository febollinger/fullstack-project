import { z } from "zod";

const createLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const returnLoginSchema = createLoginSchema.omit({
    password:true
})

const returnLoginArSchema = returnLoginSchema.array()

export {
    createLoginSchema,
    returnLoginSchema,
    returnLoginArSchema
}