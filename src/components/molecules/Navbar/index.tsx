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
import { INavItem, ROUTE } from 'constant/index';
import { useRouter } from 'next/router';
import React from 'react';
interface IProps {}

const Navbar: React.FC<IProps> = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        bg='white'
        color='gray.600'
        minH={'60px'}
        pt={{ base: 4, xl: '49px' }}
        px={{
          sm: '16px',
          md: '100px',
          xl: '167px',
        }}
        align={'center'}
      >
        <Flex
          justify={{ base: 'space-between', md: 'flex-end' }}
          alignItems='center'
          w='full'
        >
          <Text
            display={{ base: 'initial', md: 'none' }}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color='gray.800'
          >
            Logo
          </Text>
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
                fontWeight={navItem.pathname === router.pathname ? 600 : 400}
                color='black'
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
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: INavItem) => {
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
            color='black'
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
        <Text fontWeight={href === router.pathname ? 600 : 400} color='black'>
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
