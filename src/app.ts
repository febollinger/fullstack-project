import "express-async-errors";
import express, { Application } from "express";

import  clientRouters from "./routers/client/clients.routers";
import contactRouters from "./routers/contact/contacts.routers";
import handleError from "./errors";
import loginRouters from "./routers/login/login.routers";

const app: Application = express();
app.use(express.json())

app.use("/client", clientRouters)
app.use("/contact", contactRouters)
app.use("/login", loginRouters)

app.use(handleError)

export default app

