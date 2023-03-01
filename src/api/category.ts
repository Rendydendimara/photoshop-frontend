import axios from 'axios';
import { BACKEND_URL, BACKEND_URLV2 } from 'constant';

export const ApiGetListCategory = async () => {
  const response = await axios
    .get(`${BACKEND_URL}/category/list`)
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

export const ApiGetListCategoryV2 = async () => {
  const response = await axios
    .get(`${BACKEND_URLV2}/category/list-with-count-brand`)
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
