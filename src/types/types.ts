import { Request } from "express";

export interface AuthorizedRequest extends Request<{ userId: string }> {}

export interface JwtPayload {
  userId: string;
}
