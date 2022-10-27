import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, SimpleGrid } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/modal';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';

const Explore: NextPage = () => {
  const height = ['529px', '600px', '350px', '500px', '429px', '400px'];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Explore</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate showNavbarFooter>
        <Box
          px={{
            base: '15px',
            md: '20px',
            xl: '30px',
          }}
          w='full'
          py='4'
        >
          <SimpleGrid padding={4} w='full' columns={[1, 2, 3]} spacing={3}>
            <Box
              maxH='100vh' //{{ base: 'unset', md: '100vh' }}
              overflowY={{ base: 'unset', md: 'scroll' }}
              className='styled-scrollbar'
            >
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((dt, index) => (
                <Box
                  onClick={onOpen}
                  _hover={{ cursor: 'pointer' }}
                  key={index}
                  w={{ base: '270px', md: '380px', lg: '400px', xl: '430px' }}
                  borderRadius='xl'
                  mb={2}
                  h={height[Math.floor(Math.random() * 5)]}
                  bgColor='#FF9797'
                />
              ))}
            </Box>

            <Box
              maxH='100vh' //{{ base: 'unset', md: '100vh' }}
              overflowY={{ base: 'unset', md: 'scroll' }}
              className='styled-scrollbar'
            >
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((dt, index) => (
                <Box
                  onClick={onOpen}
                  _hover={{ cursor: 'pointer' }}
                  key={index}
                  w={{ base: '270px', md: '380px', lg: '400px', xl: '430px' }}
                  borderRadius='xl'
                  mb={2}
                  h={height[Math.floor(Math.random() * 5)]}
                  bgColor='#FF9797'
                />
              ))}
            </Box>

            <Box
              maxH='100vh' //{{ base: 'unset', md: '100vh' }}
              overflowY={{ base: 'unset', md: 'scroll' }}
              className='styled-scrollbar'
            >
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((dt, index) => (
                <Box
                  onClick={onOpen}
                  _hover={{ cursor: 'pointer' }}
                  key={index}
                  w={{ base: '270px', md: '380px', lg: '400px', xl: '430px' }}
                  borderRadius='xl'
                  mb={2}
                  h={height[Math.floor(Math.random() * 5)]}
                  bgColor='#FF9797'
                />
              ))}
            </Box>
          </SimpleGrid>
        </Box>
        <Modal
          closeOnOverlayClick={false}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size='3xl'
        >
          <ModalOverlay />
          <ModalContent maxH='90vh'>
            <ModalCloseButton />
            <ModalBody mt='40px' w='full' overflowY='scroll'>
              <Flex justifyContent='flex-end'>
                <Box width='303px' height='49px' bgColor='#D9D9D9' />
              </Flex>
              <SimpleGrid mt='17px' columns={[1, 3, 5]} spacing='16px'>
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
                <Box width='135px' height='135px' bgColor='#D9D9D9' />
              </SimpleGrid>
            </ModalBody>
            <ModalFooter justifyContent='center'>
              <Button bgColor='#D9D9D9' onClick={onClose} w='135px'></Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </AppTemplate>
    </Layout>
  );
};

export default Explore;
