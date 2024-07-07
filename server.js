import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import morgan from "morgan";
import categoriesRouter from "./src/server/routers/CategoriesRouter.js";
import businessesRouter from "./src/server/routers/BusinessesRouter.js";
import bookingsRouter from "./src/server/routers/BookingsRouter.js";
import errorHandler from "./src/server/middleware/ErrorHandler.js";

const server = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "",
      version: "1.0.0",
    },
  },
  apis: ["./src/server/**/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
server.use(express.json());
server.use(morgan("common"));
server.use(cors());

server.use("/api/categories", categoriesRouter);
server.use("/api/businesses", businessesRouter);
server.use("/api/bookings", bookingsRouter);

server.use(errorHandler);

const dbConnection = process.env.DB_CONNECTION;
if (!dbConnection) {
  console.error("DB_CONNECTION environment variable is not defined");
  process.exit(1);
}

mongoose
  .connect(dbConnection)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(3001, () => {
      console.log("Server is running on http://localhost:3001/api-docs");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
