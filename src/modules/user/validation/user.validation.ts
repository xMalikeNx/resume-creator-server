import { LOGIN_MATCH, PASSWORD_MATCH } from "../user.consts";

export const isLoginValid = (login: string) => LOGIN_MATCH.test(login);

export const isPasswordValid = (password: string) =>
  PASSWORD_MATCH.test(password);
