// REDUX APP
// CSS GLOBAL
import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ReactGA } from 'lib/ga';

import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import { GlobalProvider } from 'provider/global-provider';
import { store } from 'provider/redux/store';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import '../styles/normalize.css';
import '../styles/suitcss-base.css';
export interface AppRenderProps {
  pageProps: object;
  err?: Error;
  Component: NextComponentType<NextPageContext, AppRenderProps, object>;
  router: NextRouter;
}

/**
 *
 * Disable border-line by default in Chakra UI
 */
const GlobalStyles = css`
  /*
   This will hide the focus indicator if the element receives focus    via the mouse,
   but it will still show up on keyboard focus.
 */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  button:focus {
    outline: none;
    box-shadow: none !important;
  }
`;

export default function App({ Component, pageProps }: AppRenderProps) {
  const router = useRouter();
  // const [loadingFetchUserInfo, setLoadingFetchUserInfo] =
  //   useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // const getUserInfo = async (token: string) => {
  //   setLoadingFetchUserInfo(true);
  //   const responseGetUserInfo = await ApiCheckUserLogin(token);
  //   if (responseGetUserInfo?.status === 200) {
  //     store.dispatch({ type: 'SET_USER', user: responseGetUserInfo.data.data });
  //     localCookieSaveToken(responseGetUserInfo.data.data.token);
  //   } else {
  //     // handle error fetch
  //   }
  //   setLoadingFetchUserInfo(false);
  // };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 400,
      easing: 'ease-in-sine',
      delay: 100,
    });
    // async function funcAsyncDefault() {
    //   // const token = localCookieLoadToken() ?? '';
    //   // await getUserInfo(token);
    //   setPageLoading(false);
    // }
  }, []);

  useEffect(() => {
    async function funcAsyncDefault() {
      // const token = localCookieLoadToken() ?? '';
      // await getUserInfo(token);
      setTimeout(() => {
        setPageLoading(false);
      }, 2000);
    }
    funcAsyncDefault();
    const handleRouteChange = (url: string) => {
      setPageLoading(false);
      ReactGA.pageview(url);
    };
    const handleRouteChangeStart = (url: string) => {
      setPageLoading(true);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Provider store={store}>
        <Global styles={GlobalStyles} />
        <ChakraProvider>
          <GlobalProvider loading={pageLoading}>
            <Component {...pageProps} />
          </GlobalProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}
