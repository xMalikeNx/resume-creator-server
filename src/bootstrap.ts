import express, { Express } from "express";
import dotenv from "dotenv";

export const bootstrap = (app: Express) => {
  dotenv.config();
  app.use(express.json());
};
