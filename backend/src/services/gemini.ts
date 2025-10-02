/**
 * Minimal Gemini wrapper.
 * - If process.env.GEMINI_KEY is present, you can implement a real call here.
 * - For now this will mock deterministic responses for development.
 *
 * Replace the `mock` branches with actual HTTP calls to the model provider.
 */

import { GEMINI_KEY } from "../config/env";

export async function generateQuestionsMock(candidateContext: string | null, count = 6) {
  // simple deterministic question set for JS / Fullstack role
  const pool = [
    { qid: "q1", question: "What is a closure in JavaScript and give an example?", timeLimit: 120 },
    { qid: "q2", question: "Explain event loop and microtasks in Node.js.", timeLimit: 150 },
    { qid: "q3", question: "Describe how you would optimize a slow React component.", timeLimit: 120 },
    { qid: "q4", question: "Explain REST vs GraphQL; when to choose which?", timeLimit: 150 },
    { qid: "q5", question: "How would you design a system to handle 10k req/s?", timeLimit: 180 },
    { qid: "q6", question: "Describe how you test an API endpoint (unit/integration/e2e).", timeLimit: 120 },
  ];
  return pool.slice(0, count);
}

export async function scoreAnswerMock(question: string, answerText: string) {
  // naive heuristics just for dev: length-based score + keyword check
  let score = Math.min(100, Math.floor(answerText.trim().length / 2));
  const keywords = ["example", "closure", "scope", "event loop", "React", "optimi", "scalab", "GraphQL", "REST", "test"];
  for (const k of keywords) {
    if (answerText.toLowerCase().includes(k)) score = Math.min(100, score + 5);
  }
  const summary = score > 70 ? "Good answer with solid points." : score > 40 ? "Partial understanding; add examples." : "Needs improvement; lacks key points.";
  const breakdown = [
    { criterion: "Relevance", awarded: Math.round(score * 0.6), max: 60 },
    { criterion: "Examples / Depth", awarded: Math.round(score * 0.4), max: 40 },
  ];
  return { score, summary, breakdown };
}

/**
 * Public functions used by controllers/services
 */
export async function generateQuestions(candidateContext: string | null, count = 6) {
  if (!GEMINI_KEY) return generateQuestionsMock(candidateContext, count);
  // TODO: implement real call to Gemini / Google GenAI
  return generateQuestionsMock(candidateContext, count);
}

export async function scoreAnswer(question: string, answerText: string) {
  if (!GEMINI_KEY) return scoreAnswerMock(question, answerText);
  // TODO: implement real call
  return scoreAnswerMock(question, answerText);
}

export async function generateFinalSummary(answers: { question: string; answerText?: string; score?: number }[]) {
  if (!GEMINI_KEY) {
    const avg = Math.round((answers.reduce((s, a) => s + (a.score || 0), 0) / (answers.length || 1)));
    const summary = avg > 75 ? "Candidate shows strong fundamentals and communication." : avg > 50 ? "Candidate has decent fundamentals but needs improvement." : "Candidate needs significant improvement.";
    return { totalScore: avg, summary };
  }
  // TODO: implement with Gemini
  return generateFinalSummary(answers);
}
