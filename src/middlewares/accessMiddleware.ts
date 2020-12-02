import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

import { AuthorizedRequest, JwtPayload } from "../types/types";
import { extractAuthorizationCookie } from "../utils/extractAuthorizationCookie";
import { ResponseCreator } from "../utils/ResponseCreator";

export const accessMiddleware = (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = extractAuthorizationCookie(req.headers.cookie as string);
  if (!token) {
    return res
      .status(401)
      .json(ResponseCreator.createErrorResponse("Unauthorized"));
  }
  const payload = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
  req.params.userId = payload.userId;
  next();
};
