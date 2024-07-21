import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API for Managing Categories, Services and Bookings",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}`,
      },
    ],
  },
  apis: ["./src/server/**/*.ts"],
};

const configSwagger = (server: Express): void => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default configSwagger;
