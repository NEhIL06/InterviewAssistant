import { scoreAnswer } from "./gemini";

/**
 * Score single answer; returns structured result
 */
export async function evaluateAnswer(question: string, answerText: string) {
  const result = await scoreAnswer(question, answerText);
  return result; // {score, summary, breakdown}
}
