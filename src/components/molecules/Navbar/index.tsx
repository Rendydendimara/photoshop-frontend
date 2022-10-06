import { Box, Flex, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
interface IProps {}

const Navbar: React.FC<IProps> = () => {
  const router = useRouter();

  if (router.pathname === '/') {
    return (
      <Text
        pt={{
          base: '20px',
          xl: '26x',
        }}
        fontWeight='400'
        fontSize='14px'
        lineHeight='19px'
        textAlign='center'
        color='#353535'
        backgroundColor='#f1f1f1'
      >
        BETA VERSION
      </Text>
    );
  }
  return (
    <Box
      padding={{
        base: '20px',
        xl: '32px',
      }}
      display='flex'
      w='full'
      justifyContent='space-between'
      alignItems='center'
      gap='20px'
      backgroundColor='#f1f1f1' // {router.pathname === '/' ? 'white' : 'transparent'}
    >
      <Flex alignItems='center' gap='24px'>
        <Link passHref href='/about'>
          <Text
            _hover={{
              cursor: 'pointer',
            }}
            textAlign='right'
            fontWeight='bold'
            fontSize='14px'
            lineHeight='19px'
            color={
              router.pathname === '/about'
                ? '#1333DF'
                : router.pathname === '/'
                ? 'white'
                : '#353535'
            }
          >
            About Us
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
