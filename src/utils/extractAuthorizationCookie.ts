export const extractAuthorizationCookie = (cookies: string) => {
  if (!cookies) {
    return undefined;
  }
  let cookiesParts = cookies.split(";");
  const authorizationCookie = cookiesParts.find((cookiePart) => {
    const [key, value] = cookiePart.split("=");
    if (key === "Authorization") {
      return true;
    }
    return false;
  });
  if (!authorizationCookie) {
    return undefined;
  }
  const [key, value] = authorizationCookie.split("=");
  const [_, token] = value.split(" ");
  return token;
};
