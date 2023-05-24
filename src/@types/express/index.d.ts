import * as express from "express";

declare global {
    namespace Express{
        interface Request{
            auth: {
                clientUuid?: string
                contactUuid?: string
            }
        }
    }
}