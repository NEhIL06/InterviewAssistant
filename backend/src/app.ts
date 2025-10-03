

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routes/auth";
import { candidateRouter } from "./routes/candidate";
import { interviewerRouter } from "./routes/interviewer";
import { interviewRouter } from "./routes/interview";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(json({ limit: "2mb" }));

app.use("/api/auth", authRouter);//chal rha hai
app.use("/api/candidate", candidateRouter);//chal rha hai
app.use("/api/interviewer", interviewerRouter);
app.use("/api/interview", interviewRouter);

// health check
app.get("/", (req, res) => res.send("Hello from Interview Backend"));

// error handler (last)
app.use(errorHandler);
