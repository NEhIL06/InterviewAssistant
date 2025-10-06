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
    console.log("inside candidate upload route");
    const { name, email, phone, appliedPosition, resumeText } = req.body;
    console.log(req.body);
    const exists = await Candidate.findOne({ email });
    console.log(exists);
    if (exists) return res.status(400).json({ error: "Email already exists" });
    if (!name || !email || !phone) return res.status(400).json({ error: "Missing required fields" });

    // parse resume text to detect missing fields
    const parsed = parseResumeText(resumeText);
    console.log("parsed resume text:");
    console.log(parsed);
    const newUser = new Candidate({
      name,
      email,
      phone,
      appliedPosition: appliedPosition || "Software Engineer",
      resumeText: resumeText || "",
      status: "applied",
    });
    console.log(newUser);
    await newUser.save();
    console.log("new user saved");

    res.status(201).json({ message: "Data uploaded successfully", candidateId: newUser._id, parsed, user:newUser });
  } catch (err) {
    next(err);
  }
});
