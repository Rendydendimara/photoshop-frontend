export const BACKEND_LOCAL_URL = 'http://localhost:8080/api/v1';
export const BACKEND_STAGING_URL = '';
export const BACKEND_PRODUCTION_URL = '';

// https://dev-sqlgenie.herokuapp.com/api/v1
// http://159.223.65.0:8080/
// export const BACKEND_URL: string = 'http://159.223.65.0:8080/v1';
export const BACKEND_URL: string =
  process.env.NODE_ENV === 'development'
    ? BACKEND_LOCAL_URL
    : BACKEND_PRODUCTION_URL;
export const APP_NAME = 'PHOTOSHOP';

export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
}
export const ROUTE: INavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Compare',
    href: '#',
  },
];
