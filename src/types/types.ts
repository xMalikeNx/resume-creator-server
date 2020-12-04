import { Request } from "express";

export interface AuthorizedRequest<T = unknown>
  extends Request<T & { userId: string }> {}

export interface JwtPayload {
  userId: string;
}
