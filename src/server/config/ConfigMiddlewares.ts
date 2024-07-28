import cors from "cors";
import morgan from "morgan";
import express, { Application } from "express";

const configMiddlewares = (server: Application): void => {
  server.use(express.json());
  server.use(morgan("common"));
  server.use(cors());
};

export default configMiddlewares;
