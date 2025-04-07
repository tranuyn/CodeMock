import Cookies from "js-cookie";

export const COOKIE_KEY = {
  Token: "token",
};

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function setCookie(
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
) {
  Cookies.set(key, value, options);
}

export function removeCookie(key: string) {
  Cookies.remove(key, {
    path: "/",
  });
}
