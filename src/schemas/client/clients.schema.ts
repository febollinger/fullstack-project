import {z} from "zod";


const createClientSchema = z.object({
    name: z.string().min(3).max(60),
    email: z.string().email().max(80),
    password: z.string().max(150),
    number: z.string().max(11)
})

const returnClientSchema = createClientSchema.extend({
    id: z.number(),
    createdAt: z.string()
}).omit({
    password: true
})

const returnAllClientsSchema = returnClientSchema.array()
const updateClientSchema = createClientSchema.partial()

export {
    createClientSchema,
    returnClientSchema, 
    returnAllClientsSchema,
    updateClientSchema
}