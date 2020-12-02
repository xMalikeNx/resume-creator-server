import { NextFunction, Request, Response } from "express";
import { ResponseCreator } from "../../../utils/ResponseCreator";
import { CreateUserDto } from "../user.dto";
import { isLoginValid, isPasswordValid } from "../validation/user.validation";

export const createUserDtoValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body as CreateUserDto;
  if (!isLoginValid(login) || !isPasswordValid(password)) {
    return res
      .status(400)
      .json(ResponseCreator.createErrorResponse("Invalid credentials"));
  }
  next();
};
