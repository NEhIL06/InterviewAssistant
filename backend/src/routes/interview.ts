import { Router } from "express";
import { InterviewStartSchema, InterviewAnswerSchema, InterviewFinishSchema } from "../types";
import { validate } from "../middlewares/validate";
import { Candidate } from "../models/candidate";
import { createQuestionSetForCandidate } from "../services/questionGen";
import { evaluateAnswer } from "../services/scoring";
import { generateFinalSummary } from "../services/gemini";

export const interviewRouter = Router();

/**
 * Interview sessions are lightweight: we store questions inside candidate.answers as progress.
 * For a production app, you'd use a dedicated Session collection. This simplified flow:
 * - POST /start -> generate question set, mark candidate.interviewing
 * - POST /answer -> accept qid + answerText, STT already done client-side (we store text)
 * - POST /finish -> compute final summary & total score
 */



// POST /api/interview/start
interviewRouter.post("/start", async (req, res, next) => {
  try {
    const parsedData = InterviewStartSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsedData.error });
    }
    const candidateId = parsedData.data.candidateId;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });

    const questions = await createQuestionSetForCandidate(candidate.resumeText);
    // map into candidate.answers with question fields (empty answers)
    const questionRecords = questions.map((q: any) => ({
      qid: q.qid,
      question: q.question,
      answerText: "",
    }));
    candidate.answers = questionRecords;
    candidate.status = "interviewing";
    await candidate.save();

    res.json({ sessionId: candidate._id, questions: candidate.answers.map(a => ({ qid: a.qid, question: a.question, timeLimit: (a as any).timeLimit || 120 })) });
  } catch (err) {
    next(err);
  }
});

// POST /api/interview/answer
interviewRouter.post("/answer", async (req, res, next) => {
  try {
    const parsedData = InterviewAnswerSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsedData.error });
    }
    const { sessionId, qid, answer } = parsedData.data;
    console.log("Received answer for session:", req.body.sessionId);
    console.log("Answer details:", { sessionId, qid, answer });
    const candidate = await Candidate.findById(sessionId);
    console.log("Fetched candidate record:", candidate);
    if (!candidate) return res.status(404).json({ error: "Session / candidate not found" });
    console.log("Received answer for session:", sessionId, qid);
    const q = candidate.answers.find(a => a.qid === qid);
    console.log("Found question record:", q);
    if (!q) return res.status(404).json({ error: "Question not found in session" });

    // We only store text; assume client has performed STT for any mock audio recording.
    q.answerText = answer;
    console.log("Stored answer text:", q.answerText);
    // Score the answer via scoring service
    const scoring = await evaluateAnswer(q.question, answer);
    console.log("Received scoring:", scoring);
    q.score = scoring.score;
    q.breakdown = scoring.breakdown;
    q.summary = scoring.summary;
    console.log("Scoring result:",q);
    await candidate.save();
    console.log("Updated candidate record saved.");
    res.status(200).json({ score: q.score, summary: q.summary, breakdown: q.breakdown });
  } catch (err) {
    next(err);
  }
});

// POST /api/interview/finish
interviewRouter.post("/finish", async (req, res, next) => {
  try {
    const parsedData = InterviewFinishSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid request data", details: parsedData.error });
    }
    const { sessionId } = parsedData.data;
    const candidate = await Candidate.findById(sessionId);
    if (!candidate) return res.status(404).json({ error: "Session / candidate not found" });

    // compute aggregate score
    const totalScore = Math.round((candidate.answers.reduce((sum, a) => sum + (a.score || 0), 0) / (candidate.answers.length || 1)));
    candidate.totalScore = totalScore;

    // Use generateFinalSummary from gemini wrapper
    //const { generateFinalSummary } = await import("../services/gemini"); // dynamic to avoid circular
    const fin = await generateFinalSummary(candidate.answers.map(a => ({ question: a.question, answerText: a.answerText, score: a.score })));
    candidate.summary = fin.summary || `Total score ${totalScore}`;
    candidate.status = totalScore > 70 ? "hired" : "interviewing";
    console.log("Final summary:",candidate);
    await candidate.save();

    res.status(200).json({ totalScore, summary: candidate.summary });
  } catch (err) {
    next(err);
  }
});
