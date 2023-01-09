import { logEvent } from '@firebase/analytics';
import axios from 'axios';
import { BACKEND_URL } from 'constant';
import { analytics } from 'lib/firebase';
import { GAEvent, ReactGA } from 'lib/ga';

export const ApiGetListBrand = async (data: {
  category?: string[];
  notIncludeBrandId?: string[];
  keyword?: string[];
  module?: string[];
}) => {
  let newCategory = data.category?.filter((cat) => cat !== 'all');
  let newModule = data.module?.filter((mod) => mod !== 'all');
  // GAEvent({
  //   action: 'on-search-list-brand',
  //   params: JSON.stringify({
  //     data: {
  //       keyword: data.keyword,
  //       module: newModule,
  //       category: newCategory,
  //     },
  //   }),
  // });
  // ReactGA.event({
  //   category: 'SearchBrand',
  //   action: JSON.stringify({
  //     data: {
  //       keyword: data.keyword,
  //       module: newModule,
  //       category: newCategory,
  //     },
  //   }),
  // });
  logEvent(analytics, 'search', {
    category: 'SearchBrand',
    search_term: JSON.stringify({
      data: {
        keyword: data.keyword,
        module: newModule,
        category: newCategory,
      },
    }),
  });
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
  // GAEvent({
  //   action: 'on-search-brand-in-search-bar',
  //   params: JSON.stringify({
  //     data: {
  //       keyword: data.keyword,
  //     },
  //   }),
  // });
  // ReactGA.event({
  //   category: 'SearchBrand',
  //   action: JSON.stringify({
  //     data: {
  //       keyword: data.keyword,
  //     },
  //   }),
  // });
  logEvent(analytics, 'search', {
    category: 'SearchBrand',
    search_term: JSON.stringify({
      data: {
        keyword: data.keyword,
      },
    }),
  });

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
  // GAEvent({
  //   action: 'on-find-list-brand-by-modules',
  //   params: JSON.stringify({
  //     data: {
  //       moduleName: newModule,
  //       category: newCategory,
  //     },
  //   }),
  // });
  // ReactGA.event({
  //   category: 'SearchBrand',
  // action: JSON.stringify({
  //   data: {
  //     moduleName: newModule,
  //     category: newCategory,
  //   },
  // }),
  // });
  logEvent(analytics, 'search', {
    category: 'SearchBrand',
    search_term: JSON.stringify({
      data: {
        moduleName: newModule,
        category: newCategory,
      },
    }),
  });
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
