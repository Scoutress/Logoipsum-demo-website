import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API for Managing Categories, Businesses, and Bookings",
      version: "1.0.0",
      description: "API for managing categories, businesses, and bookings.",
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
  apis: ["./src/server/**/*.js"],
};

const configSwagger = (server) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default configSwagger;
