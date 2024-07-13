import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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

const ConfigSwagger = (server) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default ConfigSwagger;
