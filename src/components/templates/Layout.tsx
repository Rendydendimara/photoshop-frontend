import { Box } from '@chakra-ui/layout';
import Navbar from 'components/molecules/Navbar';
import { APP_NAME } from 'constant';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { Chakra } from '../../../Chakra';
// import Footer from '../Footer';
// import Header from '../Header';
import styles from './Layout.module.css';

interface IProps {
  children: ReactNode;
  cookies?: string;
}

interface IProps {}

const Layout: React.FC<IProps> = (props) => {
  return (
    <Chakra cookies={props.cookies}>
      <div>
        <Head>
          {/* Favicon Icon */}
          {/* <link
            rel='apple-touch-icon-precomposed'
            sizes='57x57'
            href='apple-touch-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='114x114'
            href='apple-touch-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='72x72'
            href='apple-touch-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='144x144'
            href='apple-touch-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='60x60'
            href='apple-touch-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='120x120'
            href='apple-touch-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='76x76'
            href='apple-touch-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='152x152'
            href='apple-touch-icon-152x152.png'
          />
          <link
            rel='icon'
            type='image/png'
            href='favicon-196x196.png'
            sizes='196x196'
          />
          <link
            rel='icon'
            type='image/png'
            href='favicon-96x96.png'
            sizes='96x96'
          />
          <link
            rel='icon'
            type='image/png'
            href='favicon-32x32.png'
            sizes='32x32'
          />
          <link
            rel='icon'
            type='image/png'
            href='favicon-16x16.png'
            sizes='16x16'
          />
          <link
            rel='icon'
            type='image/png'
            href='favicon-128.png'
            sizes='128x128'
          />
          <meta name='application-name' content='&nbsp;' />
          <meta name='msapplication-TileColor' content='#FFFFFF' />
          <meta name='msapplication-TileImage' content='mstile-144x144.png' />
          <meta
            name='msapplication-square70x70logo'
            content='mstile-70x70.png'
          />
          <meta
            name='msapplication-square150x150logo'
            content='mstile-150x150.png'
          />
          <meta
            name='msapplication-wide310x150logo'
            content='mstile-310x150.png'
          />
          <meta
            name='msapplication-square310x310logo'
            content='mstile-310x310.png'
          />{' '} */}
          <link rel='icon' href='/favicon.ico' />
          <link
            href='https://unpkg.com/aos@2.3.1/dist/aos.css'
            rel='stylesheet'
          />
          <meta
            httpEquiv='Content-Security-Policy'
            content='upgrade-insecure-requests'
          />
          <meta name='theme-color' content='#1333df' />
          <meta property='og:type' content='website' />
          <meta name='application-name' content='&nbsp;' />
          <meta name='msapplication-TileColor' content='#FFFFFF' />
          <title>{APP_NAME}</title>
          <meta name='description' content='' />
          {/* <meta
          name='google-site-verification'
          content=''
        /> */}
        </Head>
        {/* <Header /> */}
        {/* <Navbar /> */}
        <main className={styles.main}>
          <Box maxW='1700px' w='full'>
            {props.children}
          </Box>
        </main>
        {/* <Footer /> */}
        <script
          async
          defer
          src='https://unpkg.com/aos@2.3.1/dist/aos.js'
        ></script>
        <script
          src='https://accounts.google.com/gsi/client'
          async
          defer
        ></script>
        <script>AOS.init()</script>
      </div>
    </Chakra>
  );
};

export default Layout;
export { getServerSideProps } from '../../../Chakra';
