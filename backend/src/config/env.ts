import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "3000";
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/interview";
export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
export const GEMINI_KEY = process.env.GEMINI_KEY || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
