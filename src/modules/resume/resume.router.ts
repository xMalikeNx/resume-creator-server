import { Request, Response, Router } from "express";

import { createResumeDtoValidationMiddleware } from "./middlewares/createResumeDtoValidationMiddleware";
import { updateResumeDtoValidationMiddleware } from "./middlewares/updateResumeDtoValidation";
import { accessMiddleware } from "../../middlewares/accessMiddleware";
import { ResponseCreator } from "../../utils/ResponseCreator";
import { errorResponse } from "../../utils/errorResponse";
import { AuthorizedRequest } from "../../types/types";
import { ResumeService } from "./resume.service";
import { ResumeDtoPayload } from "./resume.dto";

const resumeRouter = Router();
const resumeService = new ResumeService();

resumeRouter.get(
  "/",
  [accessMiddleware],
  async (req: AuthorizedRequest, res: Response) => {
    try {
      const result = await resumeService.getResumes(req.params.userId);
      return res.json(ResponseCreator.createSuccessResponse(result));
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

resumeRouter.get(
  "/:userLogin/:resumeUrl",
  async (
    req: Request<{ resumeUrl: string; userLogin: string }>,
    res: Response
  ) => {
    try {
      const { resumeUrl, userLogin } = req.params;
      const resume = await resumeService.getResume(userLogin, resumeUrl);
      return res.json(ResponseCreator.createSuccessResponse(resume));
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

resumeRouter.post(
  "/",
  [accessMiddleware, createResumeDtoValidationMiddleware],
  async (req: AuthorizedRequest, res: Response) => {
    try {
      const createResumeDto = req.body as ResumeDtoPayload;
      const resume = await resumeService.createResume(
        req.params.userId,
        createResumeDto
      );
      return res.json(ResponseCreator.createSuccessResponse(resume));
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

resumeRouter.put(
  "/:resumeId",
  [accessMiddleware, updateResumeDtoValidationMiddleware],
  async (req: AuthorizedRequest<{ resumeId: string }>, res: Response) => {
    try {
      const userId = req.params.userId;
      const resumeId = req.params.resumeId;
      const updateResumePayload = req.body as ResumeDtoPayload;
      const updatedResume = await resumeService.updateResume(
        userId,
        resumeId,
        updateResumePayload
      );
      return res.json(ResponseCreator.createSuccessResponse(updatedResume));
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

resumeRouter.delete(
  "/:resumeId",
  [accessMiddleware],
  async (req: AuthorizedRequest<{ resumeId: string }>, res: Response) => {
    try {
      await resumeService.deleteResume(req.params.userId, req.params.resumeId);
      return res.json(ResponseCreator.createSuccessResponse());
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

export default resumeRouter;
