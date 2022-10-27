import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Center, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { HiOutlinePlusSm, HiTrash } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { Image as ChakraImage } from '@chakra-ui/image';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal';
import { RiSearchLine } from 'react-icons/ri';

const Compare: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Compare</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate showNavbarFooter>
        <Flex
          gap='40px'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Box>
            <Text fontWeight='600' fontSize='20px'>
              Compare Competitor
            </Text>
          </Box>
          <Flex alignItems='flex-start' gap='80px'>
            <Box>
              <Flex
                // filter='drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04)) drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08))'
                boxShadow='md'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
              >
                <ChakraImage alt='shoope' src='/images/shoope.png' />
              </Flex>
              <Center>
                <Button
                  fontWeight='400'
                  fontSize='14px'
                  color='#B4C6D5'
                  colorScheme='teal'
                  variant='unstyle'
                  leftIcon={<HiTrash />}
                >
                  Remove
                </Button>
              </Center>
            </Box>
            <Flex
              // filter='drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04)) drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08))'
              boxShadow='md'
              justifyContent='center'
              alignItems='center'
              minW='240px'
              minH='190px'
              flexDirection='column'
              onClick={onOpen}
            >
              <AiOutlinePlus size='30' fill='#172A3A' />
              <Text fontWeight='500' fontSize='16px' color='#172A3A'>
                Add Competitor
              </Text>
            </Flex>
            <Flex
              // filter='drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04)) drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08))'
              onClick={onOpen}
              boxShadow='md'
              justifyContent='center'
              alignItems='center'
              minW='240px'
              minH='190px'
              flexDirection='column'
            >
              <AiOutlinePlus size='30' fill='#172A3A' />
              <Text fontWeight='500' fontSize='16px' color='#172A3A'>
                Add Competitor
              </Text>
            </Flex>
          </Flex>
          <Box>
            <Link href='/explore-compare'>
              <Button
                leftIcon={<HiOutlinePlusSm />}
                color='#FBFFFE'
                fontWeight='600'
                variant='solid'
                w='full'
                bgColor='#09BC8A'
                h='40px'
              >
                Compare
              </Button>
            </Link>
          </Box>
        </Flex>
        <Modal
          // closeOnOverlayClick={false}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size='3xl'
        >
          <ModalOverlay />
          <ModalContent p='0' maxH='90vh'>
            <ModalBody mt='15px' w='full' overflowY='scroll'>
              <Flex
                gap='10px'
                alignItems='center'
                mb='8'
                flexDirection='column'
              >
                <Text fontWeight='500' fontSize='16px' color='#172A3A'>
                  Search Competitor
                </Text>
                <Center>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiSearchLine color='#B4C6D5' />}
                    />
                    <Input
                      width='365px'
                      height='41px'
                      border='2px solid #172A3A !important'
                      borderRadius='8px'
                      placeholder='Ex Gojek, Cart, or Fashion'
                      _placeholder={{
                        fontWeight: 300,
                        fontSize: '14px',
                        color: '#B4C6D5',
                      }}
                    />
                  </InputGroup>
                </Center>
              </Flex>
              <SimpleGrid mt='17px' columns={[1, 3, 5]} spacing='12px'>
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
                <Box width='120px' height='120px' bgColor='#D9D9D9' />
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </AppTemplate>
    </Layout>
  );
};

export default Compare;
