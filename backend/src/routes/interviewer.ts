import { Router } from "express";
import { Candidate } from "../models/candidate";
import { authMiddleware } from "../middlewares/auth";

export const interviewerRouter = Router();

// Protected routes for interviewers
interviewerRouter.use(authMiddleware);

interviewerRouter.get("/candidates", async (req, res, next) => {
  try {
    const list= await Candidate.find({}).select("name email status totalScore updatedAt").sort({ updatedAt: -1 });
    if(!list) return res.status(404).json({ error: "No candidates found" });
    res.status(200).json({candidates: list});
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    next(err);
  }
});

interviewerRouter.get("/candidate/:id", async (req, res, next) => {
  try {
    const c = await Candidate.findById(req.params.id).lean();
    
    if (!c)
    {
      return res.status(404).json({ candidate:c,error: "Candidate not found" });
    }
    res.status(200).json({ candidate: c});
  } catch (err) {
    next(err);
  }
});
