import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

export const bootstrap = (app: Express) => {
  dotenv.config();
  app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost" }));
  app.use(express.json());
};
