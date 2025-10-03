import mongoose, { Document, Schema } from "mongoose";

export type AnswerRecord = {
  qid: string;
  question: string;
  answerText?: string;
  score?: number;
  breakdown?: { criterion: string; awarded: number; max: number }[];
  summary?: string;
  timeTakenSeconds?: number;
  createdAt?: Date;
};

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone?: string;
  appliedPosition?: string;
  resumeText?: string; // we store only text
  answers: AnswerRecord[];
  totalScore?: number;
  summary?: string;
  status?: "applied" | "interviewing" | "hired" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}


const AnswerSchema = new Schema(
  {
    qid: String,
    question: String,
    answerText: String,
    score: Number,
    breakdown: [{ criterion: String, awarded: Number, max: Number }],
    summary: String,
    timeTakenSeconds: Number,
  },
  { _id: false, timestamps: { createdAt: "createdAt" } }
);

const CandidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    appliedPosition: String,
    resumeText: String,
    answers: { type: [AnswerSchema], default: [] },
    totalScore: Number,
    summary: String,
    status: { type: String, enum: ["applied", "interviewing", "hired", "rejected"], default: "applied" },
  },
  { timestamps: true }
);

export const Candidate = mongoose.model<ICandidate>("Candidate", CandidateSchema);
