import { Response } from "express";
import { HttpError } from "./HttpError";
import { ResponseCreator } from "./ResponseCreator";

export const errorResponse = (res: Response, error: HttpError) => {
  return res
    .status(error.code || 500)
    .json(ResponseCreator.createErrorResponse(error.message));
};
