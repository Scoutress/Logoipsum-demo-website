import "dotenv/config";
import express from "express";
import configSwagger from "./config/ConfigSwagger.js";
import configMiddlewares from "./config/ConfigMiddlewares.js";
import connectToDb from "./libs/ConnectToDb.js";
import errorHandler from "./middleware/ErrorHandler.js";
import configRoutes from "./config/ConfigRoutes.js";

const server = express();
configSwagger(server);
configMiddlewares(server);
configRoutes(server);

server.use(errorHandler);

await connectToDb(() => {
  server.listen(5005, () => {
    //TODO: Remove log before deploy
    console.log("Server is running on http://localhost:5005/api-docs");
  });
});
