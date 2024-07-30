import mongoose from "mongoose";

const connectToDb = async (successCallback?: () => void): Promise<void> => {
  const dbConnection = process.env.DB_CONNECTION;
  if (!dbConnection) {
    console.error("DB_CONNECTION environment variable is not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbConnection);
    if (successCallback && typeof successCallback === "function") {
      successCallback();
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

export default connectToDb;
