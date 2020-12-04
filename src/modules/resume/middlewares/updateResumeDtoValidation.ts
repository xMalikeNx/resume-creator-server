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

export const updateResumeDtoValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, experience, education, skills } = req.body as ResumeDtoPayload;
  let error = false;

  if (!isUrlValid(url)) {
    error = true;
  }
  if (experience && experience.length && !isExperienceArrayValid(experience)) {
    console.log('experience error');
    error = true;
  }
  if (!isEducationArrayValid(education)) {
    console.log('education error');
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
