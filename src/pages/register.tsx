import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { ApiRegister } from 'api/auth';
const Register: NextPage = () => {
  const [formRegister, setFormRegister] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSubmit, setRegisterSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onChangeFormRegister = (e: any) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setRegisterSubmit(true);
    const res = await ApiRegister(formRegister);
    if (res.status === 200) {
      setIsSuccess(true);
    } else {
      setErrMessage(res.data.message);
    }
    setRegisterSubmit(false);
  };

  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Register</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          {isSuccess ? (
            <Alert
              status='success'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Success Register Account
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                Thanks for submitting your register.
                <Link href='/login'>
                  <Button my='4' colorScheme='green'>
                    Login New Account
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          ) : (
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Sign up
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>
              {errMessage && (
                <Alert status='error' my='4'>
                  <AlertIcon />
                  {errMessage}
                </Alert>
              )}
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <form onSubmit={onSubmit}>
                    <Stack spacing={4}>
                      <HStack>
                        <Box>
                          <FormControl id='firstName' isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                              type='text'
                              name='username'
                              value={formRegister.username}
                              onChange={onChangeFormRegister}
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <FormControl id='email' isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type='email'
                          name='email'
                          value={formRegister.email}
                          onChange={onChangeFormRegister}
                        />
                      </FormControl>
                      <FormControl id='password' isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={formRegister.password}
                            onChange={onChangeFormRegister}
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Button
                          onClick={onSubmit}
                          type='submit'
                          isLoading={loginSubmit}
                          loadingText='Submitting'
                          size='lg'
                          bg={'blue.400'}
                          color={'white'}
                          _hover={{
                            bg: 'blue.500',
                          }}
                        >
                          Register
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user?{' '}
                      <Link href='/login' color={'blue.400'}>
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          )}
        </Flex>
      </AppTemplate>
    </Layout>
  );
};

export default Register;
