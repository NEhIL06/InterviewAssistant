

import { z } from "zod";

/**
 * Zod schemas used in validate middleware
 */

// Auth schemas
export const SignUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20).optional(),
  password: z.string().min(6),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Candidate upload
export const CandidateUploadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  appliedPosition: z.string().optional(),
  resumeText: z.string().optional(), // optional textual resume
});

// Interview actions
export const InterviewStartSchema = z.object({
  candidateId: z.string().min(1),
});

export const InterviewAnswerSchema = z.object({
  sessionId: z.string().min(1),
  qid: z.string().min(1),
  answer: z.string().min(0), // allow empty string as no-answer
});

export const InterviewFinishSchema = z.object({
  sessionId: z.string().min(1),
});
