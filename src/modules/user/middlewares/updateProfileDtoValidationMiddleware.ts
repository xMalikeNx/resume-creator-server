import { NextFunction, Request, Response } from "express";
import { parseDate } from "../../../utils/date-helpers";

import { ResponseCreator } from "../../../utils/ResponseCreator";
import { UpdateProfileDto } from "../user.dto";
import { isEmailValid, isPhoneValid } from "../validation/user.validation";

export const updateProfileDtoValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    about,
    email,
    phone,
    birthDate,
  } = req.body as UpdateProfileDto;
  let error = false;

  if (!firstName || !firstName.length || firstName.length > 50) {
    error = true;
  }

  if (!lastName || !lastName.length || lastName.length > 50) {
    error = true;
  }

  if (about && about.length > 300) {
    error = true;
  }

  if (!email || !isEmailValid(email)) {
    error = true;
  }

  if (phone && !isPhoneValid(phone)) {
    error = true;
  }

  if (!birthDate || !parseDate(birthDate)) {
    error = true;
  }

  if (error) {
    return res
      .status(400)
      .json(ResponseCreator.createErrorResponse("Invalid credentials"));
  }

  next();
};
