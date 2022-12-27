import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Link as ChakraLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ApiLogout } from 'api/auth';
import { AppLogoIcon } from 'components/atoms/icons/app-logo-icon';
import { INavItem, ROUTE } from 'constant/index';
import { IUser } from 'interfaces/IUser';
import { localCookieClearToken } from 'lib/Cookies/AppCookies';
import { useRouter } from 'next/router';
import { ICombinedState } from 'provider/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
interface IProps {}

interface IReduxState {
  user?: IUser;
}

const Navbar: React.FC<IProps> = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box px={{ base: '16px', md: 'unset' }} mb={{ base: '60px', md: 'unset' }}>
      <Flex
        bg='white'
        color='gray.600'
        minH={'60px'}
        pt={{ base: 4, xl: '48px' }}
        // px={{
        //   sm: '16px',
        //   md: '100px',
        //   xl: '167px',
        // }}
        align={'center'}
        justifyContent='space-between'
      >
        <ChakraLink href='/' _hover={{ cursor: 'pointer' }}>
          <AppLogoIcon />
        </ChakraLink>
        <Flex
          justify={{ base: 'space-between', md: 'flex-end' }}
          alignItems='center'
          // w='full'
        >
          <Flex display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant='unstyled'
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>
      <MobileDrawer open={isOpen} onClose={onToggle} />
    </Box>
  );
};

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const router = useRouter();
  const { user } = useSelector<ICombinedState, IReduxState>((state) => {
    return {
      user: state.user.user,
    };
  });

  const handleLogout = async () => {
    const res = await ApiLogout();
    if (res.status === 200) {
      localCookieClearToken();
      router.replace('/explore');
    }
  };

  return (
    <Stack direction={'row'} spacing={4}>
      {ROUTE.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <ChakraLink
                p={2}
                href={navItem.href ?? '#'}
                fontSize='16px'
                lineHeight='19px'
                fontWeight={500}
                color={
                  navItem.pathname === router.pathname ? '#09BC8A' : '#172A3A'
                }
                _hover={{
                  textDecoration: 'none',
                }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child: any) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
      {/* {!user ? (
        <Box>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <ChakraLink
                p={2}
                href={'/login'}
                fontSize='16px'
                lineHeight='19px'
                fontWeight='400'
                color='green'
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Login
              </ChakraLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ) : (
        <Text color='red' _hover={{ cursor: 'pointer' }} onClick={handleLogout}>
          Logout
        </Text>
      )} */}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: INavItem) => {
  const router = useRouter();
  return (
    <ChakraLink
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
            color={href === router.pathname ? '#09BC8A' : '#172A3A'}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

const MobileNavItem = ({ label, children, href }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ChakraLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={500}
          color={href === router.pathname ? '#09BC8A' : '#172A3A'}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <ChakraLink key={child.label} py={2} href={child.href}>
                {child.label}
              </ChakraLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileDrawer: React.FC<any> = (props) => {
  const btnRef: any = React.useRef();

  return (
    <Box>
      <Drawer
        isOpen={props.open}
        placement='right'
        onClose={props.onClose}
        finalFocusRef={btnRef}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody px='0'>
            <Stack
              bg={useColorModeValue('white', 'gray.800')}
              p={4}
              display={{ md: 'none' }}
            >
              {ROUTE.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
