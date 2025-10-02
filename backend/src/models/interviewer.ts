import mongoose, { Document, Schema } from "mongoose";

export interface IInterviewer extends Document {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password: string; // hashed
  createdAt: Date;
  updatedAt: Date;
}

const InterviewerSchema = new Schema<IInterviewer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Interviewer = mongoose.model<IInterviewer>("Interviewer", InterviewerSchema);
