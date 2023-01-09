import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { AllBrandIcon } from 'components/atoms/icons/all-brand-icon';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Threesecond from 'icons/3second.svg';
import AIcon from 'icons/a.svg';
import Banggood from 'icons/Banggood.svg';
import Bukalapak from 'icons/bukalapak.svg';
import EBay from 'icons/EBay.svg';
import Freshbox from 'icons/freshbox.svg';
import Iherb from 'icons/iherb.svg';
import Jamtangan from 'icons/jamtangan.svg';
import Path14942 from 'icons/path14942.svg';
import Adidas from 'icons/adidas.svg';
import Berrybenka from 'icons/berrybenka.svg';
import Coldstorage from 'icons/coldstorage.svg';
import Etsy from 'icons/Etsy.svg';
import Giant from 'icons/giant.svg';
import Ikea from 'icons/Ikea.svg';
import Jdid from 'icons/jdid.svg';
import Uiga from 'icons/uiga.svg';
import Allogresh from 'icons/allogresh.svg';
import Atome from 'icons/atome.svg';
import Blibi from 'icons/blibi.svg';
import Decathlon from 'icons/Decathlon.svg';
import Fairprice from 'icons/fairprice.svg';
import Hypermart from 'icons/Hypermart.svg';
import Informa from 'icons/informa.svg';
import Lazada from 'icons/Lazada.svg';
import { Image } from '@chakra-ui/image';
import { GAEvent, ReactGA } from 'lib/ga';
import Router from 'next/router';
import { analytics } from 'lib/firebase';

const ICONS_BRAND = [
  {
    icon: <Threesecond />,
    src: '/icons/3second.svg',
  },
  {
    icon: <AIcon />,
    src: '/icons/a.svg',
  },
  {
    icon: <Banggood />,
    src: '/icons/Banggood.svg',
  },
  {
    icon: <Bukalapak />,
    src: '/icons/bukalapak.svg',
  },
  {
    icon: <EBay />,
    src: '/icons/EBay.svg',
  },
  {
    icon: <Freshbox />,
    src: '/icons/freshbox.svg',
  },
  {
    icon: <Iherb />,
    src: '/icons/iherb.svg',
  },
  {
    icon: <Jamtangan />,
    src: '/icons/jamtangan.svg',
  },
  {
    icon: <Path14942 />,
    src: '/icons/path14942.svg',
  },
  {
    icon: <Adidas />,
    src: '/icons/adidas.svg',
  },
  {
    icon: <Berrybenka />,
    src: '/icons/berrybenka.svg',
  },
  {
    icon: <Coldstorage />,
    src: '/icons/coldstorage.svg',
  },
  {
    icon: <Etsy />,
    src: '/icons/Etsy.svg',
  },
  {
    icon: <Giant />,
    src: '/icons/giant.svg',
  },
  {
    icon: <Ikea />,
    src: '/icons/Ikea.svg',
  },
  {
    icon: <Jdid />,
    src: '/icons/jdid.svg',
  },
  {
    icon: <Uiga />,
    src: '/icons/uiga.svg',
  },
  {
    icon: <Allogresh />,
    src: '/icons/allogresh.svg',
  },
  {
    icon: <Atome />,
    src: '/icons/atome.svg',
  },
  {
    icon: <Blibi />,
    src: '/icons/blibi.svg',
  },
  {
    icon: <Decathlon />,
    src: '/icons/Decathlon.svg',
  },
  {
    icon: <Fairprice />,
    src: '/icons/fairprice.svg',
  },
  {
    icon: <Hypermart />,
    src: '/icons/Hypermart.svg',
  },
  {
    icon: <Informa />,
    src: '/icons/informa.svg',
  },
  {
    icon: <Lazada />,
    src: '/icons/Lazada.svg',
  },
];

const Home: NextPage = () => {
  const gotoExplorePage = () => {
    logEvent(analytics, 'select_content', {
      category: 'ButtonClick',
      value: 'click-expolorer-button',
    });
    // ReactGA.event({
    //   category: 'ButtonClick',
    //   action: 'click-expolorer-button',
    // });
    Router.push('/explore');
    // GAEvent({
    //   action: 'on-click-expole-button',
    //   params: '',
    // });
  };

  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate
        px={{
          sm: '16px',
          md: '0',
          xl: '0',
        }}
      >
        <Box
          h={{ base: 'initial', md: '100vh' }}
          w='full'
          pt={{ base: '33px', md: 0 }}
        >
          <Flex
            h='full'
            w='full'
            justifyContent='space-between'
            alignItems={{ base: 'initial', md: 'center' }}
            flexDirection={{ base: 'column', md: 'row' }}
            gap={{ base: 0, md: '50px', xl: '100px' }}
          >
            <Box w={{ base: '100%', md: '758px' }}>
              <Heading
                as='h1'
                textAlign='left'
                fontWeight='700'
                fontSize={{ base: '30px', md: '64px' }}
                lineHeight={{ base: '150%', md: '96px' }}
                mt={{ base: '-45px', md: 0 }}
                color='#000'
              >
                Home for
                <br /> Real Design Inspiration
              </Heading>
              <Text
                // w={{ base: 'initial', md: '430px' }}
                fontWeight='400'
                fontSize={{ base: '18px', md: '24px' }}
                lineHeight={{ base: '150%', md: '36px' }}
                textAlign='left'
                mt={{ base: '12px', md: 0 }}
              >
                Bring you a new way to find a design inspiration, more than 150
                apps we collect for your inspiration.
              </Text>
              <Box display={{ base: 'initial', md: 'none' }}>
                <Marquee speed={10}>
                  <Flex
                    mt='38px'
                    alignItems='center'
                    justifyContent='space-between'
                    overflowX='scroll'
                    w='full'
                    gap='14px'
                  >
                    {ICONS_BRAND.slice(0, 13).map((brand, i) => (
                      <Flex
                        justifyContent='center'
                        alignItems='center'
                        bgColor='#F2F2F2'
                        minW='64px'
                        minH='64px'
                        maxW='64px'
                        maxH='64px'
                        p='2'
                        borderRadius='8px'
                      >
                        <Image src={brand.src} />
                        {/* {brand.icon} */}
                      </Flex>
                    ))}
                  </Flex>
                </Marquee>
                <Marquee speed={5}>
                  <Flex
                    mt='11px'
                    alignItems='center'
                    justifyContent='space-between'
                    overflowX='scroll'
                    w='full'
                    gap='14px'
                  >
                    {ICONS_BRAND.slice(13, ICONS_BRAND.length).map(
                      (brand, i) => (
                        <Flex
                          justifyContent='center'
                          alignItems='center'
                          bgColor='#F2F2F2'
                          minW='64px'
                          minH='64px'
                          maxW='64px'
                          maxH='64px'
                          p='2'
                          borderRadius='8px'
                        >
                          <Image src={brand.src} />
                          {/* {brand.icon} */}
                        </Flex>
                      )
                    )}
                  </Flex>
                </Marquee>
              </Box>
              <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
                {/* <Link href='/explore'> */}
                <Button
                  onClick={gotoExplorePage}
                  mt={{ base: '184px', md: '40px' }}
                  width='210px'
                  height='56px'
                  bgColor='#09BC8A'
                  boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                  _hover={{
                    bgColor: '#07A377',
                  }}
                  borderRadius='12px'
                  color='white'
                  fontWeight='500'
                  fontSize='20px'
                >
                  Explore
                </Button>
                {/* </Link> */}
              </Flex>
            </Box>
            <Flex
              display={{ base: 'none', md: 'initial' }}
              w={{ base: 'full', md: '339px' }}
              gap='10px'
              justifyContent='flex-end'
            >
              <AllBrandIcon />
            </Flex>
          </Flex>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default Home;
