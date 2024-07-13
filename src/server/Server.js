import "dotenv/config";
import express from "express";
import {
  configEnvVariables,
  configSwagger,
  configMiddlewares,
  configRoutes,
  connectToDb,
} from "./config/Index.js";
import errorHandler from "./middleware/ErrorHandler.js";

const { SERVER_PORT } = configEnvVariables;

const startServer = async () => {
  const server = express();
  configSwagger(server);
  configMiddlewares(server);
  configRoutes(server);

  server.use(errorHandler);

  await connectToDb(() => {
    server.listen(SERVER_PORT, () => {
      //TODO: Remove log before deploy
      console.log(
        `Server is running on http://localhost:${SERVER_PORT}/api-docs`
      );
    });
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
