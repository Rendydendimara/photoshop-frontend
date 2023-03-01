import axios from 'axios';
import { BACKEND_URL } from 'constant';

export const ApiGetListScreenByModuleAndBrandId = async (
  brandId: string,
  moduleId: string
) => {
  const response = await axios
    .get(`${BACKEND_URL}/screen/by-brand-and-module/${brandId}/${moduleId}`)
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
