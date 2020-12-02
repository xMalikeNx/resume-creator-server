const expiresTime = {
  second: 1000,
  minute: 1000 * 60,
  hour: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
  week: 1000 * 60 * 60 * 24 * 7,
};

export const createAuthorizationCookie = (token: string) =>
  `Authorization=Bearer ${token}; HttpOnly; Path=/; Expires=${new Date(
    Date.now() + expiresTime.week
  ).toString()}`;

export const createDeleteAuthorizationCookie = () =>
  `Authorization=Bearer; HttpOnly; Path=/; Expires=${new Date(
    Date.now() - 1000
  ).toString()}`;
