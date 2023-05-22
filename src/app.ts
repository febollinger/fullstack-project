import "express-async-errors";
import express, { Application } from "express";
import { ClientRouters } from "./routers/client/clients.routers";
import contactRouters from "./routers/contact/contacts.routers";

const app: Application = express();
app.use(express.json())

app.use("/users", ClientRouters)
app.use("/contact", contactRouters)

export default app

