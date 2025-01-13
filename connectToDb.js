import mongoose from "mongoose";
import dotenv from "dotenv";

// If you're not in production, load the environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Ensure the error is thrown so the server doesn't start
  }
}

export { connectToDb };
