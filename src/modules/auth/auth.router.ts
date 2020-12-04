import { Request, Response, Router } from "express";

import { loginDtoValidationMiddleware } from "./middlewares/loginDtoValidationMiddleware";
import { accessMiddleware } from "../../middlewares/accessMiddleware";
import { ResponseCreator } from "../../utils/ResponseCreator";
import { errorResponse } from "../../utils/errorResponse";
import { AuthorizedRequest } from "../../types/types";
import {
  createAuthorizationCookie,
  createDeleteAuthorizationCookie,
} from "../../utils/createAuthorizationCookie";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";

const authRouter = Router();
const authService = new AuthService();

authRouter.get("/", (req, res) => {
  res.send("auth router");
});

authRouter.post(
  "/login",
  [loginDtoValidationMiddleware],
  async (req: Request, res: Response) => {
    try {
      const loginDto = req.body as LoginDto;
      const token = await authService.login(loginDto);
      res.header("Set-Cookie", createAuthorizationCookie(token));
      res.json(ResponseCreator.createSuccessResponse());
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

authRouter.post(
  "/logout",
  [accessMiddleware],
  async (req: Request, res: Response) => {
    try {
      res.header("Set-Cookie", createDeleteAuthorizationCookie());
      res.json(ResponseCreator.createSuccessResponse());
    } catch (err) {
      return errorResponse(res, err);
    }
  }
);

authRouter.get(
  "/profile",
  [accessMiddleware],
  async (req: AuthorizedRequest, res: Response) => {
    console.log(req.params.userId);
    res.send("ok");
  }
);

export default authRouter;
