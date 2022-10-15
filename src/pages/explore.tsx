import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Explore: NextPage = () => {
  const height = ['529px', '600px', '350px', '500px', '429px', '400px'];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Explore</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          pt='195px'
          px='168px'
          pb='50px'
        >
          <Input
            width='717px'
            height='60px'
            border='1px solid #DADADA'
            borderRadius='16px'
            placeholder='Ex Gojek, Cart, or Fashion'
            _placeholder={{
              fontWeight: 300,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#B1B1B1',
            }}
          />
          <Box mt='55px'>
            <GridImage />
            <Box mt='80px' />
            <GridImage />
            <Box mt='80px' />
            <GridImage />
          </Box>
        </Flex>
      </AppTemplate>
    </Layout>
  );
};

export default Explore;

const GridImage: React.FC<any> = () => {
  return (
    <SimpleGrid padding={4} w='full' gap='48px' columns={[2, 3, 4]} spacing={3}>
      {[0, 1, 2, 3].map((i) => (
        <Link href='/brand/shoope' key={i}>
          <Box _hover={{ cursor: 'pointer' }}>
            <Flex
              justifyContent='center'
              alignItems='center'
              boxShadow='md'
              width='full'
              height='190px'
              borderRadius='8px'
            >
              <Image
                src='/images/shoope.png'
                alt='shoope logo'
                width='174px'
                height='56px'
                objectFit='contain'
                objectPosition='center'
              />
            </Flex>
            <Box mt='18px' padding='8px'>
              <Text
                fontWeight='700'
                fontSize='20px'
                lineHeight='24px'
                textAlign='left'
              >
                Astro
              </Text>
              <Text
                mt='4px'
                textAlign='left'
                fontWeight='400'
                fontSize='16px'
                lineHeight='19px'
              >
                Last updated 28 Apr
              </Text>
              <Text
                mt='12px'
                textAlign='left'
                fontWeight='400'
                fontSize='14px'
                lineHeight='150%'
                color='#666666'
              >
                UNIQLO is a clothing apparel company, which was originally
                founded in Yamaguchi, Japan in 1949 as a textiles manufacturer.
                Now it is a global brand with over 1000 stores around the world.
                Redefining clothing, with a focus on quality and textiles which
                has been unwavered since the company's origins in 1949.
              </Text>
              <HStack spacing={2} mt='12px'>
                <Text
                  fontWeight='400'
                  fontSize='14px'
                  lineHeight='17px'
                  color='#3E97FF'
                >
                  #Ecommerce
                </Text>
                <Text
                  fontWeight='400'
                  fontSize='14px'
                  lineHeight='17px'
                  color='#3E97FF'
                >
                  #Clothes
                </Text>
              </HStack>
            </Box>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );
};
