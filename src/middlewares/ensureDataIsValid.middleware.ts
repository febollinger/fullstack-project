import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureDataIsValid = (schema: ZodTypeAny) => (req: Request, resp: Response, next: NextFunction) => {
    const validated = schema.parse(req.body)

    req.body = validated

    next()
}

export default ensureDataIsValid