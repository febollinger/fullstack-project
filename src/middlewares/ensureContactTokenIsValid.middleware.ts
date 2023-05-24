import { NextFunction, Request, Response } from "express";
import 'dotenv/config';
import jwt from "jsonwebtoken";

import { AppError } from "../errors";
import { error } from "console";

const ensureContactTokenIsValid = (req: Request, resp:Response, next: NextFunction) => {
    const  getToken = req.headers.authorization

    if(!getToken){
        throw new AppError("Missing Bearer token", 401)
    }

    const contactToken = getToken.split(" ")[1]
    jwt.verify(contactToken, process.env.SECRET_KEY!, (error, decoded: any) =>{
        if(error){
            throw new AppError(error.message, 403)
        }

        if(!decoded.contactUuid){
            throw new AppError("You aren't a Contact.", 401)
        }

        req.auth = {
            contactUuid: decoded.contactUuid
        }
    })


    next()
}

export {
    ensureContactTokenIsValid
}