import { NextFunction, Request, Response } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken"

import { AppError } from "../errors";

const ensureClientTokenIsValid = (req: Request, resp:Response, next: NextFunction) => {

    const getingToken = req.headers.authorization

    if(!getingToken){
        throw new AppError("Missing bearer token", 401)
    }

    const token: string = getingToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if(error){
            throw new AppError(error.message, 401)
        }

        if(!decoded.clientId){
            throw new AppError("You aren't a Client.", 403)
        }

        req.auth ={
            clientId: decoded.clientId
        }

    })

    next()
}

export {
    ensureClientTokenIsValid
}