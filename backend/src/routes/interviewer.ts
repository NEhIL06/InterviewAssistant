import { Router } from "express";
import { Candidate } from "../models/candidate";
import { authMiddleware } from "../middlewares/auth";

export const interviewerRouter = Router();

// Protected routes for interviewers
interviewerRouter.use(authMiddleware);

interviewerRouter.get("/candidates", async (req, res, next) => {
  try {
    const list = await Candidate.find({}).select("name email status totalScore updatedAt").sort({ updatedAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

interviewerRouter.get("/candidate/:id", async (req, res, next) => {
  try {
    const c = await Candidate.findById(req.params.id);
    if (!c) return res.status(404).json({ error: "Candidate not found" });
    res.json(c);
  } catch (err) {
    next(err);
  }
});
