import "dotenv/config";
import express from "express";
import {
  configEnvVariables,
  configSwagger,
  configMiddlewares,
  configRoutes,
  connectToDb,
} from "./config/Index.ts";
import errorHandler from "./middleware/ErrorHandler.ts";

const { SERVER_PORT } = configEnvVariables;

const startServer = async () => {
  const server = express();
  configSwagger(server);
  configMiddlewares(server);
  configRoutes(server);

  server.use(errorHandler);

  await connectToDb(() => {
    server.listen(SERVER_PORT);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
