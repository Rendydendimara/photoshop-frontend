import axios from 'axios';
import { BACKEND_URL } from 'constant';

export const ApiGetListBrand = async (data: {
  category?: string[];
  notIncludeBrandId?: string[];
  keyword?: string[];
  module?: string[];
}) => {
  let newCategory = data.category?.filter((cat) => cat !== 'all');
  let newModule = data.module?.filter((mod) => mod !== 'all');
  const response = await axios
    .post(`${BACKEND_URL}/brand/list`, {
      notIncludeBrandId: data.notIncludeBrandId,
      keyword: data.keyword,
      module: newModule,
      category: newCategory,
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

export const ApiSearchBrand = async (data: { keyword: string }) => {
  const response = await axios
    .post(`${BACKEND_URL}/brand/search`, data)
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

export const ApiGetListModules = async () => {
  const response = await axios
    .get(`${BACKEND_URL}/brand/list-flow`)
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

export const ApiFindBrandByModules = async (data: {
  moduleName: string[];
  category: string[];
}) => {
  let newModule = data.moduleName.filter((mod) => mod !== 'all');
  let newCategory = data.category.filter((cat) => cat !== 'all');
  const response = await axios
    .post(`${BACKEND_URL}/brand/by-flow`, {
      moduleName: newModule,
      category: newCategory,
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
