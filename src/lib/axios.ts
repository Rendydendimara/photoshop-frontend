import Axios from 'axios';
import { localCookieLoadToken } from './Cookies/AppCookies';

//ini request axios tapi kita upgrade dengan masang token di header buat otentifikasi user di server
//ditambah fitur auto refresh token kalo misal sudah expired token yang dipakai
//lalu otomatis logout jika token sudah ga valid

export const AxiosWithToken = (options = {}) => {
  const token = localCookieLoadToken();
  const config = token
    ? {
        headers: {
          'sqlgenie-token': token,
        },
      }
    : {};
  const instance = Axios.create(config);

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
};
