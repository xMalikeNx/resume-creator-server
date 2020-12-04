import { Response } from "express";

import { ResponseCreator } from "./ResponseCreator";
import { HttpError } from "./HttpError";

export const errorResponse = (res: Response, error: HttpError) => {
  return res
    .status(!error.code || error.code > 558 ? 500 : error.code)
    .json(ResponseCreator.createErrorResponse(error.message));
};
