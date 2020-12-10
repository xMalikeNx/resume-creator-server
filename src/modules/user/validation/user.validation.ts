import {
  EMAIL_MATCH,
  LOGIN_MATCH,
  PASSWORD_MATCH,
  PHONE_MATCH,
} from "../user.consts";

export const isLoginValid = (login: string) => LOGIN_MATCH.test(login);

export const isPasswordValid = (password: string) =>
  PASSWORD_MATCH.test(password);

export const isPhoneValid = (phone: string) => PHONE_MATCH.test(phone);

export const isEmailValid = (email: string) => EMAIL_MATCH.test(email);
