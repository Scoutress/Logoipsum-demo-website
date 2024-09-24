import express from "express";
import {
  configSwagger,
  configMiddlewares,
  configRoutes,
  connectToDb,
} from "./config/Index.ts";
import errorHandler from "./middleware/ErrorHandler.ts";

const server = express();

configSwagger(server);
configMiddlewares(server);
configRoutes(server);

server.use(errorHandler);

await connectToDb();

export default server;
