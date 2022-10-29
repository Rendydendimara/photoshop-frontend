import axios from 'axios';
import { BACKEND_URL } from 'constant';

export const ApiGetListBrand = async (data: {
  category?: string;
  notIncludeBrandId?: string[];
  keyword?: string[];
}) => {
  const response = await axios
    .post(`${BACKEND_URL}/brand/list`, data)
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

export const ApiGetDetailBrand = async (brandId: string) => {
  const response = await axios
    .get(`${BACKEND_URL}/brand/detail/${brandId}`)
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
