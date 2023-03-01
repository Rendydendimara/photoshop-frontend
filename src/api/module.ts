import axios from 'axios';
import { BACKEND_URL } from 'constant';

export const ApiFindModule = async (data: { keyword?: string[] }) => {
  const response = await axios
    .post(`${BACKEND_URL}/module/find`, {
      keyword: data.keyword,
    })
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

export const ApiFindModuleByBrand = async (brandId: string) => {
  const response = await axios
    .get(`${BACKEND_URL}/module/list-by-brand/${brandId}`)
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
