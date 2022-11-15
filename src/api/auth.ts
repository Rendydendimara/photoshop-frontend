import axios from 'axios';
import { BACKEND_URL } from 'constant';
import { AxiosWithToken } from 'lib/axios';

export const ApiRegister = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios
    .post(`${BACKEND_URL}/auth/register`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    // return window.location.replace('/500');
  }
};

export const ApiLogin = async (data: {
  email_username: string;
  password: string;
}) => {
  const response = await axios
    .post(`${BACKEND_URL}/auth/login`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    // return window.location.replace('/500');
  }
};

export const ApiLogout = async () => {
  const response = await AxiosWithToken()
    .get(`${BACKEND_URL}/auth/logout`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    // return window.location.replace('/500');
  }
};

export const ApiCheckUserLogin = async (token: string) => {
  const response = await axios
    .post(`${BACKEND_URL}/auth/check-user-login`, { token })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    // return window.location.replace('/500');
  }
};
