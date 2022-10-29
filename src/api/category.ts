import axios from 'axios';
import { BACKEND_URL } from 'constant';

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
