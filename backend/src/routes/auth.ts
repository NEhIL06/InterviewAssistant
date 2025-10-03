import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Interviewer } from "../models/interviewer";
import { SignUpSchema, SignInSchema } from "../types";
import { validate } from "../middlewares/validate";
import { JWT_SECRET } from "../config/env";

export const authRouter = Router();

authRouter.post("/signup", validate(SignUpSchema), async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const existing = await Interviewer.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });
    const hashed = await bcrypt.hash(password, 12);
    const user = new Interviewer({ name, email, phone, password: hashed });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/signin", validate(SignInSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Interviewer.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid password" });
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "7d" });
    console.log(token);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});
