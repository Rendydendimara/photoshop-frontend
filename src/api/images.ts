import axios from 'axios';
import { BACKEND_URL } from 'constant';

export const ApiGetListImageByBrandId = async (data: {
  brandId: string;
  moduleFolder?: string;
}) => {
  const response = await axios
    .post(`${BACKEND_URL}/image/list`, data)
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

export const ApiGetListModuleByBrandId = async (brandId: string) => {
  const response = await axios
    .post(`${BACKEND_URL}/image/list-module-by-brand`, { brandId: brandId })
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

export const ApiGetListSameModuleByBrandsId = async (brandsId: string[]) => {
  const response = await axios
    .post(`${BACKEND_URL}/image/list-same-module-by-brands`, {
      listBrandId: brandsId,
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
