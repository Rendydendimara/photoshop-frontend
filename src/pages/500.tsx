import { Box, Heading, Text, Button } from '@chakra-ui/react';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box
          h='80vh'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Heading
            display='inline-block'
            as='h2'
            backgroundClip='text'
            color='#FFAE50'
          >
            500
          </Heading>
          <Text fontSize='18px' mt={3} mb={2}>
            Internal Server Error
          </Text>
          <Text color={'gray.500'} mb={6}>
            The page you&apos;re looking for does not seem to exist
          </Text>
          <Link href='/'>
            <Button
              fontSize='14px'
              fontWeight='600'
              borderRadius='4px'
              color='#fff'
              backgroundColor='#1330D1'
            >
              Go to Home
            </Button>
          </Link>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default NotFound;
