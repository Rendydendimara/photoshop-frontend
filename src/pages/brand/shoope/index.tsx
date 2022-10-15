import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image as ImageChakra } from '@chakra-ui/image';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeftCircle } from 'react-icons/fi';

const BrandIndex: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpenImage = () => {
    onOpen();
  };

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Brand</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Link href='/explore'>
          <IconButton
            mt='4'
            mx={{ base: '15px', md: '40px', lg: '80px' }}
            variant='outline'
            colorScheme='whatsapp'
            aria-label='back'
            icon={<FiArrowLeftCircle />}
          />
        </Link>
        <Flex pt='100px' pb='50px' w='full' alignItems='flex-start'>
          <Box
            px={{ base: '15px', md: '40px', lg: '80px' }}
            w={{ base: '100%', lg: '25%' }}
          >
            <Box>
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
                  founded in Yamaguchi, Japan in 1949 as a textiles
                  manufacturer. Now it is a global brand with over 1000 stores
                  around the world. Redefining clothing, with a focus on quality
                  and textiles which has been unwavered since the company's
                  origins in 1949.
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
          </Box>
          <Box w={{ base: '100%', lg: '75%' }}>
            <ListImage onClickImage={onOpenImage} />
            <Box mt={{ base: '30px', md: '50px', lg: '96px' }} />
            <ListImage onClickImage={onOpenImage} />
            <Box mt={{ base: '30px', md: '50px', lg: '96px' }} />
            <ListImage onClickImage={onOpenImage} />
          </Box>
        </Flex>
        <Modal onClose={onClose} isOpen={isOpen} isCentered size='6xl'>
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
          <ModalContent
            className='styled-scrollbar'
            bgColor='transparent'
            border='unset'
            maxH='90vh'
            w='full'
            maxW='90%'
            boxShadow='unset'
            overflow='scroll'
          >
            <ModalBody w='full' border='unset'>
              <Flex mt='24px' gap='48px' w='full' h='100%'>
                {[0, 1, 2, 3].map((i) => (
                  <ImageChakra
                    src='/images/example-shoope-image.png'
                    alt='example-shoope-image'
                    width='480px'
                    height='853.33px'
                    objectFit='contain'
                    objectPosition='center'
                    key={i}
                    _hover={{
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </AppTemplate>
    </Layout>
  );
};

export default BrandIndex;

const ListImage: React.FC<any> = (props) => {
  return (
    <Box>
      <Text fontWeight='700' fontSize='20px' lineHeight='24px'>
        Cart Page
      </Text>
      <Flex
        mt='24px'
        gap='48px'
        alignItems='center'
        maxW='full'
        overflowX='scroll'
        className='styled-scrollbar'
        p='3'
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <ImageChakra
            onClick={props.onClickImage}
            src='/images/example-shoope-image.png'
            alt='example-shoope-image'
            width='360px'
            height='640px'
            objectFit='contain'
            objectPosition='center'
            key={i}
            _hover={{
              cursor: 'pointer',
            }}
          />
        ))}
      </Flex>
    </Box>
  );
};
