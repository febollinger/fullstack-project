import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error{
    statusCode: number;
    message: string;

    constructor(message: string, statusCode: number){
        super()

        this.message = message
        this.statusCode = statusCode
    }
}

const handleError = (error: Error, req: Request, resp: Response, _:NextFunction) => {
    if(error instanceof AppError){
        return resp.status(error.statusCode).json({
            message:error.message
        })
    }

    if(error instanceof ZodError){
        return resp.status(400).json({
            message: error.flatten().fieldErrors
        })
    }

    console.log(error.message)
    return resp.status(500).json({
        message: "Internal Server Error"
    })
}

export default handleError