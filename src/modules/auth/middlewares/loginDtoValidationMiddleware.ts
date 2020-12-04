import { NextFunction, Request, Response } from "express";

import { ResponseCreator } from "../../../utils/ResponseCreator";
import { LoginDto } from "../auth.dto";

export const loginDtoValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body as LoginDto;
  if (!login || !password) {
    res
      .status(400)
      .json(ResponseCreator.createErrorResponse("Invalid credentials"));
  }
  next();
};
