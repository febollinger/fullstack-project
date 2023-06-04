import "express-async-errors";
import express, { Application } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../swagger.json";

import  clientRouters from "./routers/client/clients.routers";
import handleError from "./errors";
import loginRouters from "./routers/login/login.routers";

const app: Application = express();
app.use(express.json())
const cors = require("cors");

app.use(cors());
app.use("/client", clientRouters)
app.use("/login", loginRouters)

app.use(
    '/api-docs',
    swaggerUI.serve, 
    swaggerUI.setup(swaggerFile)
  );

app.use(handleError)

export default app

