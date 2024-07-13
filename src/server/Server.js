import "dotenv/config";
import configEnvVariables from "./config/ConfigEnvVariables.js";
import express from "express";
import configSwagger from "./config/ConfigSwagger.js";
import configMiddlewares from "./config/ConfigMiddlewares.js";
import connectToDb from "./libs/ConnectToDb.js";
import errorHandler from "./middleware/ErrorHandler.js";
import configRoutes from "./config/ConfigRoutes.js";

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
