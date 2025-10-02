import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export async function connectDB() {
  await mongoose.connect(MONGO_URI, {
  });
  console.log("MongoDB connected");
}
