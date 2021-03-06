const expiresTime = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
};

export const createAuthorizationCookie = (token: string) =>
  `Authorization=Bearer ${token};${
    process.env.DOMAIN
      ? ` SameSite=None; Secure; Domain=${process.env.DOMAIN};`
      : ""
  } Path=/; Expires=${new Date(
    Date.now() + expiresTime.week
  ).toString()}; HttpOnly`;

export const createDeleteAuthorizationCookie = () =>
  `Authorization=Bearer; Path=/; Expires=${new Date(
    Date.now() - 1000
  ).toString()}; SameSite=None; Secure; HttpOnly`;
