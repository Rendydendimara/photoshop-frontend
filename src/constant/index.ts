export const BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
export const APP_NAME = 'Thetruesight';

export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
  pathname?: string;
}
export const ROUTE: INavItem[] = [
  // {
  //   label: 'Home',
  //   href: '/',
  //   pathname: '/',
  // },
  {
    label: 'Explore',
    href: '/explore',
    pathname: '/explore',
  },
  // {
  //   label: 'About Us',
  //   href: '/about',
  //   pathname: '/about',
  // },
  // {
  //   label: 'Compare',
  //   href: '/compare',
  //   pathname: '/compare',
  // },
];
