import mongoose from "mongoose";

const connectToDb = async (successCallback) => {
  const dbConnection = process.env.DB_CONNECTION;
  if (!dbConnection) {
    //TODO: Remove log before deploy
    console.error("DB_CONNECTION environment variable is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbConnection);
    //TODO: Remove log before deploy
    console.log("Connected to MongoDB");
    if (successCallback && typeof successCallback === "function") {
      successCallback();
    }
  } catch (err) {
    //TODO: Remove log before deploy
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export default connectToDb;
