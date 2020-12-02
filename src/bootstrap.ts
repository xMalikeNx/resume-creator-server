import dotenv from "dotenv";
import express, { Express } from "express";

export const bootstrap = (app: Express) => {
  dotenv.config();
  app.use(express.json());
};
