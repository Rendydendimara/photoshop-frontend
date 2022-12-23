import { Button } from '@chakra-ui/button';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import { AllBrandIcon } from 'components/atoms/icons/all-brand-icon';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate
        px={{
          sm: '15px',
          md: '40px',
          xl: '124px',
        }}
      >
        <Box
          h={{ base: 'initial', md: '100vh' }}
          w='full'
          pt={{ base: '33px', md: 0 }}
          pb={{ base: '98px', md: 0 }}
        >
          <Flex
            h='full'
            w='full'
            justifyContent='space-between'
            alignItems={{ base: 'initial', md: 'center' }}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Box w={{ base: '100%', md: '700px' }}>
              <Text
                textAlign='left'
                fontWeight='700'
                fontSize={{ base: '30px', md: '64px' }}
                lineHeight={{ base: '150%', md: '96px' }}
                mt={{ base: '-45px', md: 0 }}
                color='#000'
              >
                GOOD INSPIRATIONS GOOD DESIGN
              </Text>
              <Text
                w={{ base: 'initial', md: '430px' }}
                fontWeight='400'
                fontSize={{ base: '18px', md: '24px' }}
                lineHeight={{ base: '150%', md: '36px' }}
                textAlign='left'
                mt={{ base: '12px', md: 0 }}
              >
                Bring you a new way to looking a design inspiration, more than
                150 apps we collect for your inspiration.
              </Text>
              <Flex justifyContent={{ base: 'center', md: 'flex-start' }}>
                <Link href='/explore'>
                  <Button
                    mt={{ base: '25px', md: '40px' }}
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
                    // size='md'
                  >
                    Explore
                  </Button>
                </Link>
              </Flex>
            </Box>
            <Flex
              w={{ base: 'full', md: 'initial' }}
              gap='10px'
              justifyContent='flex-end'
            >
              <AllBrandIcon />
              {/* <Flex flexDirection='column' gap='10px'>
                <BoxImage noBG />
                <BoxImage noBG />
                <BoxImage noBG />
                <BoxImage />
              </Flex>
              <Flex flexDirection='column' gap='10px'>
                <BoxImage noBG />
                <BoxImage noBG />
                <BoxImage noBG />
                <BoxImage />
                <BoxImage />
              </Flex>
              <Flex flexDirection='column' gap='10px'>
                <BoxImage noBG />
                <BoxImage noBG />
                <BoxImage />
                <BoxImage />
                <BoxImage />
                <BoxImage />
              </Flex>
              <Flex flexDirection='column' gap='10px'>
                <BoxImage />
                <BoxImage />
                <BoxImage />
                <BoxImage />
                <BoxImage />
                <BoxImage />
                <BoxImage />
              </Flex> */}
            </Flex>
          </Flex>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default Home;
