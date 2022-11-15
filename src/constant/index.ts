export const BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
export const APP_NAME = 'PHOTOSHOP';

export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
  pathname?: string;
}
export const ROUTE: INavItem[] = [
  {
    label: 'Home',
    href: '/',
    pathname: '/',
  },
  {
    label: 'Explore',
    href: '/explore',
    pathname: '/explore',
  },
  {
    label: 'Compare',
    href: '/compare',
    pathname: '/compare',
  },
];
