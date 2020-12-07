import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

export const bootstrap = (app: Express) => {
  dotenv.config();
  app.use(cors());
  app.use(express.json());
};
