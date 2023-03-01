export interface IModule {
  _id: string;
  count: number;
}

export interface IModuleV2 {
  _id: string;
  name: string;
  description: string;
  screen: {
    _id: string;
    images: string[];
    brand: {
      _id: string;
      name: string;
      logoSmall: string;
    };
  }[];
}
