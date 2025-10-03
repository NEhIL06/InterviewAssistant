/**
 * Gemini service using @google/genai SDK
 * - Uses gemini-2.5-pro for all calls
 * - Falls back to mocks if GEMINI_KEY is not set
 */

import { GEMINI_KEY } from "../config/env";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: GEMINI_KEY,
    });
  }
  return aiClient;
}

/** Extract plain text from Gemini response */
function extractText(resp: any): string {
  // SDK returns resp.text for convenience
  if (resp.text) return resp.text;
  if (resp.candidates && resp.candidates.length > 0) {
    return resp.candidates[0].content?.parts?.map((p: any) => p.text).join("") ?? "";
  }
  return "";
}

/** Safe JSON parsing */
function safeParseJSON<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini response:", text, e);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* MOCK FALLBACKS                                                     */
/* ------------------------------------------------------------------ */

export async function generateQuestionsMock(candidateContext: string | null, count = 6) {
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

export async function generateFinalSummaryMock(answers: { question: string; answerText?: string; score?: number }[]) {
  const avg = Math.round((answers.reduce((s, a) => s + (a.score || 0), 0) / (answers.length || 1)));
  const summary = avg > 75 ? "Candidate shows strong fundamentals and communication." : avg > 50 ? "Candidate has decent fundamentals but needs improvement." : "Candidate needs significant improvement.";
  return { totalScore: avg, summary };
}

/* ------------------------------------------------------------------ */
/* REAL GEMINI CALLS                                                  */
/* ------------------------------------------------------------------ */

export async function generateQuestions(candidateContext: string | null, count = 6) {
  if (!GEMINI_KEY) return generateQuestionsMock(candidateContext, count);

  const ai = getClient();
  const prompt = `
You are an interviewer AI. Given the candidate’s context (resume or background), generate ${count} interview questions for a Fullstack / Software Engineer role.  
Return output in JSON form, exactly as:

{
  "questions": [
    { "qid": "q1", "question": "What is closure in JS?", "timeLimit": 120 },
    ...
  ]
}

Candidate context: 
${candidateContext ?? ""}
`;

  const resp = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { temperature: 0.3 },
  });

  const text = extractText(resp);
  const parsed = safeParseJSON<{ questions: { qid: string; question: string; timeLimit: number }[] }>(text);
  if (parsed?.questions) return parsed.questions;

  throw new Error("Failed to parse questions JSON from Gemini: " + text);
}

export async function scoreAnswer(question: string, answerText: string) {
  if (!GEMINI_KEY) return scoreAnswerMock(question, answerText);

  const ai = getClient();
  const prompt = `
You are an expert interviewer grader.  
Given a question and candidate answer, return JSON:

{
  "score": <0-100>,
  "summary": "short summary",
  "breakdown": [
    { "criterion": "Relevance", "awarded": <number>, "max": <number> },
    { "criterion": "Examples", "awarded": <number>, "max": <number> }
  ]
}

Question: ${question}
Answer: ${answerText}
`;

  const resp = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { temperature: 0.2 },
  });

  const text = extractText(resp);
  const parsed = safeParseJSON<{ score: number; summary: string; breakdown: { criterion: string; awarded: number; max: number }[] }>(text);
  if (parsed?.score !== undefined) return parsed;

  throw new Error("Failed to parse scoring JSON from Gemini: " + text);
}

export async function generateFinalSummary(answers: { question: string; answerText?: string; score?: number }[]) {
  if (!GEMINI_KEY) return generateFinalSummaryMock(answers);

  const ai = getClient();
  const promptLines = answers.map(a => `Q: ${a.question}\nA: ${a.answerText}\nScore: ${a.score}`).join("\n\n");
  const prompt = `
You are an expert interviewer. Summarize the candidate’s performance.  
Return JSON:

{
  "totalScore": <0-100>,
  "summary": "Short summary of strengths and weaknesses"
}

Answers:
${promptLines}
`;

  const resp = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { temperature: 0.2 },
  });

  const text = extractText(resp);
  const parsed = safeParseJSON<{ totalScore: number; summary: string }>(text);
  if (parsed?.totalScore !== undefined) return parsed;

  throw new Error("Failed to parse final summary JSON from Gemini: " + text);
}
