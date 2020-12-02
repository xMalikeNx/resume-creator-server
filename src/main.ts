import express from "express";

import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/user/user.router";
import { bootstrap } from "./bootstrap";
import { connectDb } from "./services/dbService";

const app = express();
bootstrap(app);

app.use("/users", userRouter);
app.use("/auth", authRouter);

const port = process.env.PORT || 3333;
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`app listen on ${port}`);
  });
});
