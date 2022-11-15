import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ApiLogin } from 'api/auth';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { PHOTOSHOP_USER_ID_LOCAL } from 'constant/local';
import { localCookieSaveToken, setLocalCookie } from 'lib/Cookies/AppCookies';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { actionSetUser } from 'provider/redux/User/UserActions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Login: NextPage = () => {
  const [formLogin, setFormLogin] = useState({
    email_username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSubmit, setLoginSubmit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeFormLogin = (e: any) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoginSubmit(true);
    const res = await ApiLogin(formLogin);
    if (res.status === 200) {
      dispatch(actionSetUser(res.data.data));
      localCookieSaveToken(res.data.data.token);
      setLocalCookie(PHOTOSHOP_USER_ID_LOCAL, res.data.data._id);
      router.replace('/explore');
    } else {
      setErrMessage(res.data.message);
    }
    setLoginSubmit(false);
  };

  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Login
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
                            name='email_username'
                            value={formLogin.email_username}
                            onChange={onChangeFormLogin}
                          />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id='password' isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name='password'
                          value={formLogin.password}
                          onChange={onChangeFormLogin}
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
                        Login
                      </Button>
                    </Stack>
                  </Stack>
                </form>
                <Stack pt={6}>
                  <Text align={'center'}>
                    New ?{' '}
                    <Link href='/register' color={'blue.400'}>
                      Register
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </AppTemplate>
    </Layout>
  );
};

export default Login;
