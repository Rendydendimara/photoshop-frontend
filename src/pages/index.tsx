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
            base: '15px',
            md: '40px',
            xl: '80px',
          }}
          h='100vh'
          w='full'
        >
          <SimpleGrid
            h='full'
            w='full'
            columns={[1, 2, 2]}
            justifyContent='space-between'
            alignItems='center'
          >
            <Box w='700px'>
              <Text
                textAlign='left'
                fontWeight='700'
                fontSize='64px'
                lineHeight='76px'
              >
                GOOD INSPIRATIONS GOOD DESIGN
              </Text>
              <Text
                w='430px'
                fontWeight='400'
                fontSize='16px'
                lineHeight='19px'
                textAlign='left'
              >
                More than 1001 architecture inspiration around the world, we
                believe this can help you to better inspiration for your design
              </Text>
              <Link href='/explore'>
                <Button
                  mt='40px'
                  width='210px'
                  height='56px'
                  bgColor='#10BA41'
                  borderRadius='12px'
                  color='white'
                >
                  Explore
                </Button>
              </Link>
            </Box>
            <Flex gap='10px' justifyContent='flex-end'>
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
          </SimpleGrid>
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
