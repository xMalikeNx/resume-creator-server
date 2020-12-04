import express from "express";

import resumeRouter from "./modules/resume/resume.router";
import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/user/user.router";
import { connectDb } from "./services/dbService";
import { bootstrap } from "./bootstrap";

const app = express();
bootstrap(app);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/resume", resumeRouter);

const port = process.env.PORT || 3333;
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`app listen on ${port}`);
  });
});
