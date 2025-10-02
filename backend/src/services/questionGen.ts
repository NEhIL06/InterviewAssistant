import { generateQuestions } from "./gemini";

/**
 * Wraps generateQuestions for session creation
 */
export async function createQuestionSetForCandidate(resumeText?: string) {
  // candidateContext can be resumeText or aggregated applicant info
  const candidateContext = resumeText || null;
  const questions = await generateQuestions(candidateContext, 6);
  return questions;
}
