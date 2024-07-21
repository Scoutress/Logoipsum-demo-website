import mongoose from "mongoose";
import configEnvVariables from "./ConfigEnvVariables.ts";

const connectToDb = (callback: () => void) => {
  const dbConnection = configEnvVariables.DB_CONNECTION;

  if (!dbConnection) {
    console.error("DB_CONNECTION is not defined in environment variables");
    process.exit(1);
  }

  mongoose
    .connect(dbConnection)
    .then(callback)
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};

export default connectToDb;
