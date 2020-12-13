import { Request, Response, NextFunction } from "express";

import { errorResponse } from "../../../utils/errorResponse";
import { HttpError } from "../../../utils/HttpError";
import { ResumeDtoPayload } from "../resume.dto";
import {
  isEducationArrayValid,
  isExperienceArrayValid,
  isSkillsValid,
  isUrlValid,
} from "../validation/resume.validation";

export const createResumeDtoValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, experience, education, skills } = req.body as ResumeDtoPayload;
  let error = false;

  if (!isUrlValid(url)) {
    error = true;
  }
  if (!isExperienceArrayValid(experience)) {
    console.log("experiecne invalid");
    error = true;
  }
  if (!isEducationArrayValid(education)) {
    console.log("education invalid");
    error = true;
  }
  if (!isSkillsValid(skills)) {
    error = true;
  }
  if (error) {
    return errorResponse(res, new HttpError("Invalid payload", 400));
  }
  next();
};
