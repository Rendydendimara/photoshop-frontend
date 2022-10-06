import { PHOTOSHOP_TOKEN_AUTH_LOCAL } from '../../constant/local';
import Cookie from 'js-cookie';

export const localCookieSaveToken = (token: string) => {
  Cookie.set(PHOTOSHOP_TOKEN_AUTH_LOCAL, token, { expires: 31 });
};

export const localCookieLoadToken = () => {
  return Cookie.get(PHOTOSHOP_TOKEN_AUTH_LOCAL);
};

export const localCookieClearToken = () => {
  Cookie.remove(PHOTOSHOP_TOKEN_AUTH_LOCAL);
};

export const setLocalCookie = (key: string, value: any) => {
  Cookie.set(key, value, { expires: 31 });
};

export const getLocalCookie = (key: string) => {
  Cookie.get(key);
};

export const removeLocalCookie = (key: string) => {
  Cookie.remove(key);
};
