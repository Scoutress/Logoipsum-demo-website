import cors from "cors";
import morgan from "morgan";
import express from "express";

const configMiddlewares = (server) => {
  server.use(express.json());
  server.use(morgan("common"));
  server.use(cors());
};

export default configMiddlewares;
