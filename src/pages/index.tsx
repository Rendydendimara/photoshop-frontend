import { Button } from '@chakra-ui/button';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate showInfoBeta>
        <Box
          px={{
            base: '12px',
            md: '40px',
            xl: '80px',
          }}
          h={{ base: 'initial', md: '100vh' }}
          w='full'
          py='4'
        >
          <Flex
            h='full'
            w='full'
            justifyContent='space-between'
            alignItems={{ base: 'initial', md: 'center' }}
            flexDirection={{ base: 'column-reverse', md: 'row' }}
          >
            <Box w={{ base: '100%', md: '700px' }}>
              <Text
                textAlign='left'
                fontWeight='700'
                fontSize={{ base: '44px', md: '64px' }}
                lineHeight={{ base: '52.14px', md: '76px' }}
                mt={{ base: '-45px', md: 0 }}
              >
                GOOD INSPIRATIONS GOOD DESIGN
              </Text>
              <Text
                w={{ base: 'initial', md: '430px' }}
                fontWeight='400'
                fontSize='16px'
                lineHeight='19px'
                textAlign='left'
                mt={{ base: '25px', md: 0 }}
              >
                More than 1001 architecture inspiration around the world, we
                believe this can help you to better inspiration for your design
              </Text>
              <Link href='/explore'>
                <Button
                  mt={{ base: '25px', md: '40px' }}
                  width='210px'
                  height='56px'
                  bgColor='#09BC8A'
                  borderRadius='12px'
                  color='white'
                  fontWeight='500'
                  fontSize='20px'
                  size='md'
                >
                  Explore
                </Button>
              </Link>
            </Box>
            <Flex
              w={{ base: 'full', md: 'initial' }}
              gap='10px'
              justifyContent='flex-end'
            >
              <Flex flexDirection='column' gap='10px'>
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
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default Home;

const BoxImage: React.FC<any> = (props) => {
  return (
    <Box
      width='72px'
      height='72px'
      bgColor={props.noBG ? 'transparent' : '#D9D9D9'}
    />
  );
};
