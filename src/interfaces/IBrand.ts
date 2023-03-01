export interface IBrand {
  brandImage: string;
  _id: string;
  brandName: string;
  description: string;
  link: string;
  category_id: {
    _id: string;
    name: string;
  };
  created_at: string;
  tags: string[];
  updated_at: string;
  screens: number;
  modules: number;
}

export interface ISearchBrand {
  brands: {
    brandImage: string;
    tags: string[];
    _id: string;
    brandName: string;
    link: string;
  }[];
  categories: {
    name: string;
    _id: string;
    totalBrand: number;
    totalScreens: number;
  }[];
}

export interface IListFlow {
  _id: string;
  count: number;
}

export interface IListBrandByFlow {
  brandImage: string;
  tags: string[];
  _id: string;
  brandName: string;
  description: string;
  link: string;
  category_id: {
    _id: string;
    name: string;
  };
  created_at: string;
  updated_at: null | string;
  images: {
    _id: string;
    imagePath: string;
  }[];
  screens: number;
  modules: number;
}

export interface IBrandV2 {
  _id: string;
  name: string;
  description: string;
  banner: string;
  companyName: string;
  logoSmall: string;
  bigLogo: string;
  category: [
    {
      _id: string;
      name: string;
      hashtag: string[];
    }
  ];
  createdAt: string;
  updatedAt: string;
  isAndroid: boolean;
  isIos: boolean;
  isWeb: boolean;
  screenTotal: number;
  images: string[];
}
