import { Router } from "express";
import { Candidate } from "../models/candidate";
import { CandidateUploadSchema } from "../types";
import { validate } from "../middlewares/validate";
import { parseResumeText } from "../services/resumeParser";

export const candidateRouter = Router();

candidateRouter.get("/", (req, res) => {
  res.send("User route is working");
});

candidateRouter.post("/upload", validate(CandidateUploadSchema), async (req, res, next) => {
  try {
    const { name, email, phone, appliedPosition, resumeText } = req.body;
    const exists = await Candidate.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    // parse resume text to detect missing fields
    const parsed = parseResumeText(resumeText);
    const newUser = new Candidate({
      name,
      email,
      phone,
      appliedPosition: appliedPosition || "Software Engineer",
      resumeText: resumeText || "",
      status: "applied",
    });
    await newUser.save();

    res.status(201).json({ message: "Data uploaded successfully", candidateId: newUser._id, parsed, user:newUser });
  } catch (err) {
    next(err);
  }
});
