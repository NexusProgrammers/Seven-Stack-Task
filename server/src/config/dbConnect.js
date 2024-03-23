import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongoUrl = process?.env?.MONGO_URI;

if (!mongoUrl) {
  throw new Error("mongoUrl is required");
}

const dbConnect = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error In Connecting", error);
    process.exit(1);
  }
};

export default dbConnect;
