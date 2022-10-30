import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Center, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { ApiGetListBrand } from 'api/brand';
import { ApiGetListCategory } from 'api/category';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { IBrand } from 'interfaces/IBrand';
import { ICategory } from 'interfaces/ICategory';
import moment from 'moment';
import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useOnClickOutside } from 'usehooks-ts';
const KeyCodes = {
  comma: 188,
  enter: 13,
  tab: 9,
  space: 32,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab];

const Explore: NextPage = () => {
  const height = ['529px', '600px', '350px', '500px', '429px', '400px'];
  const refCategory = useRef(null);
  const [openMoreCategory, setOpenMoreCategory] = useState(false);
  const [loadingGetBrand, setLoadingGetBrand] = useState(false);
  const [listBrand, setListBrand] = useState<IBrand[]>([]);
  const [listCategory, setListCategory] = useState<ICategory[]>([]);
  const modalFilterMobile = useDisclosure();
  const [filterBrand, setFilterBrand] = useState({
    selectedCategory: '',
    keyword: [],
  });
  const btnRef: any = useRef();
  const handleClickOutside = () => {
    setOpenMoreCategory(false);
  };

  useOnClickOutside(refCategory, handleClickOutside);

  const onOpenAllCategory = () => {
    if (openMoreCategory) {
      setOpenMoreCategory(false);
    } else {
      setOpenMoreCategory(true);
    }
  };

  const clearFilterBrand = ({
    isCategory,
    isKeyword,
  }: {
    isCategory: boolean;
    isKeyword: boolean;
  }) => {
    setFilterBrand({
      selectedCategory: isCategory ? '' : filterBrand.selectedCategory,
      keyword: isKeyword ? [] : filterBrand.keyword,
    });
    handleGetListBrand({});
  };

  const [tags, setTags] = useState<{ id: string; text: string }[]>([]);

  const removeKeyword = (keyword: string) => {
    const result = filterBrand.keyword.filter((key) => key !== keyword);
    setFilterBrand({
      ...filterBrand,
      keyword: result,
    });
    handleGetListBrand({
      category: filterBrand.selectedCategory,
      keyword: result,
    });
  };

  const handleGetListBrand = async (filter: {
    category?: string;
    notIncludeBrandId?: string[];
    keyword?: string[];
  }) => {
    setLoadingGetBrand(true);
    const res = await ApiGetListBrand(filter);
    if (res.status === 200) {
      setListBrand(res.data.data);
    }
    setLoadingGetBrand(false);
  };

  const handleGetListCategory = async () => {
    const res = await ApiGetListCategory();
    if (res.status === 200) {
      setListCategory(res.data.data);
    }
  };

  const renderItemBrand = (brands: IBrand[]) => {
    return <GridImage brands={brands} />;
  };

  const renderBrand = () => {
    // <GridImage />
    // <Box mt={{ base: '10px', md: '80px' }} />
    let dataBase: any = [];
    let dataItem: any = [];
    let limit = 0;
    listBrand.map((brand) => {
      dataItem.push(brand);
      limit++;
      if (listBrand.length > 4) {
        if (limit === 4) {
          dataBase.push(dataItem);
          dataItem = [];
          limit = 0;
        }
      }
    });
    if (listBrand.length < 4) {
      dataBase.push(dataItem);
    }
    return (
      <Box>
        {dataBase.map((brandBase: any, i: any) => (
          <Box key={i}>
            {renderItemBrand(brandBase)}
            <Box mt={{ base: '10px', md: '72px' }} />
          </Box>
        ))}
      </Box>
    );
  };

  const handleFilterCategory = (idCategory: string) => {
    setFilterBrand({
      ...filterBrand,
      selectedCategory: idCategory,
    });
    handleGetListBrand({ keyword: filterBrand.keyword, category: idCategory });
  };

  const handleKeyOnDownKeyword = (e: any) => {
    if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 9) {
      let newKeyword: any = [...filterBrand.keyword, e.target.value];
      setFilterBrand({
        ...filterBrand,
        keyword: newKeyword,
      });
      e.target.value = '';
      handleGetListBrand({
        category: filterBrand.selectedCategory,
        keyword: newKeyword,
      });
    }
  };

  useEffect(() => {
    // Get the navbar
    let navbar: any;

    if (typeof window !== 'undefined') {
      navbar = document.getElementById('categoryDeskop');
    }

    // Get the offset position of the navbar
    let sticky: any = navbar?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      window.onscroll = function () {
        handleScroll();
      };
    }

    function handleScroll() {
      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('stickyNavbarHome');
      } else {
        navbar.classList.remove('stickyNavbarHome');
      }
    }
  });

  useEffect(() => {
    handleGetListBrand({});
    handleGetListCategory();
  }, []);

  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Explore</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Flex
          flexDirection={{ base: 'row', md: 'column' }}
          justifyContent={{ base: 'space-between', md: 'center' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          mt={{ base: '20px', xl: '66px' }}
          // px={{ base: '15px', md: '120px' }}
          w='full'
          gap={{ base: '10px', md: 0 }}
          position='relative'
        >
          <Box>
            <InputGroup>
              <InputLeftElement
                display={{ base: 'flex', md: 'none' }}
                pointerEvents='none'
                children={<BiSearch size={16} color='#B4C6D4' />}
              />
              <Input
                width={{ base: 'full', md: '717px' }}
                height={{ base: '41px', md: '60px' }}
                border='1px solid #172A3A'
                borderColor='#172A3A'
                borderRadius='12px'
                onKeyDown={handleKeyOnDownKeyword}
                placeholder='Ex Gojek, Cart, or Fashion'
                _placeholder={{
                  fontWeight: 300,
                  fontSize: { base: '14px', md: '18px' },
                  lineHeight: '21px',
                  color: '#B4C6D5',
                }}
              />
            </InputGroup>
            {filterBrand.keyword.length > 0 && (
              <HStack mt='2' spacing='3'>
                {filterBrand.keyword.map((keyword, i) => (
                  <Button
                    rightIcon={
                      <AiOutlineClose onClick={() => removeKeyword(keyword)} />
                    }
                    color='#172A3A'
                    fontWeight='400'
                    fontSize={{ sm: '14px', md: '18px' }}
                    colorScheme='teal'
                    variant='unstyled'
                  >
                    {keyword}
                  </Button>
                ))}
              </HStack>
            )}
          </Box>

          <Box w={{ base: 'initial', md: 'full' }} mt={{ base: 0, md: '35px' }}>
            {/* Category Deskop  */}
            <Flex
              id='categoryDeskop'
              // bgColor='red'
              bgColor='white'
              w='full'
              justifyContent='center'
              // position='fixed'
              display={{ base: 'none', md: 'flex' }}
              alignItems='center'
              gap='15px'
            >
              <Flex
                bgColor='white'
                w='full'
                justifyContent='center'
                display={{ base: 'none', md: 'flex' }}
                alignItems='center'
                gap='15px'
                maxWidth='1106px'
              >
                <Button
                  onClick={() =>
                    clearFilterBrand({ isCategory: true, isKeyword: true })
                  }
                  p='8px 12px 8px 12px'
                  color='white'
                  bgColor={
                    filterBrand.selectedCategory ? 'gray.500' : '#09BC8A'
                  }
                  variant='outline'
                  fontWeight='400'
                  fontSize='14px'
                  border='1px solid #FBFFFE'
                  borderRadius='24px'
                >
                  All
                </Button>
                {listCategory.slice(0, 6).map((category, index) => (
                  <Button
                    p='8px 12px 8px 12px'
                    bgColor={
                      filterBrand.selectedCategory === category._id
                        ? '#09BC8A'
                        : 'initial'
                    }
                    borderColor='#172A3A'
                    colorScheme='#172A3A'
                    border={
                      filterBrand.selectedCategory === category._id
                        ? '1px solid whte'
                        : '1px solid #172A3A'
                    }
                    borderRadius='24px'
                    fontWeight='400'
                    fontSize='14px'
                    color={
                      filterBrand.selectedCategory === category._id
                        ? 'white'
                        : '#172A3A'
                    }
                    key={index}
                    onClick={() => handleFilterCategory(category._id)}
                    variant='outline'
                  >
                    {category.name}
                  </Button>
                ))}
                {listCategory.length > 6 && (
                  <Button
                    p='8px 12px 8px 12px'
                    border='1px solid #172A3A'
                    borderRadius='24px'
                    fontWeight='400'
                    fontSize='14px'
                    color='#172A3A'
                    variant='outline'
                    onClick={onOpenAllCategory}
                    borderColor='#172A3A'
                    colorScheme='#172A3A'
                  >
                    + 3 More
                  </Button>
                )}
              </Flex>
            </Flex>
            {/* Category Mobile */}
            <Box display={{ base: 'initial', md: 'none' }}>
              <Button
                // bgColor='#172A3A'
                variant='outline'
                borderColor='#172A3A'
                colorScheme='#172A3A'
                // borderWidth='1px'
                fontWeight='400'
                ref={btnRef}
                onClick={() => {
                  modalFilterMobile.onOpen();
                }}
                fontSize='14px'
                lineHeight='17px'
                color='#172A3A'
                rightIcon={
                  <svg
                    width='16'
                    height='17'
                    viewBox='0 0 16 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clip-path='url(#clip0_104_2404)'>
                      <path
                        d='M9.33348 16.5C9.18924 16.5 9.04888 16.4532 8.93348 16.3667L6.26682 14.3667C6.18402 14.3046 6.11682 14.224 6.07053 14.1315C6.02425 14.0389 6.00015 13.9368 6.00015 13.8333V10.0867L1.32282 4.82467C0.99063 4.44992 0.773736 3.98721 0.698203 3.49216C0.62267 2.9971 0.691713 2.49077 0.897032 2.03401C1.10235 1.57725 1.43521 1.18951 1.8556 0.917377C2.276 0.645248 2.76603 0.500316 3.26682 0.5H12.7335C13.2342 0.500587 13.7241 0.64576 14.1444 0.918071C14.5646 1.19038 14.8972 1.57825 15.1023 2.03506C15.3074 2.49187 15.3763 2.99818 15.3005 3.49316C15.2248 3.98815 15.0078 4.45073 14.6755 4.82533L10.0002 10.0867V15.8333C10.0002 16.0101 9.92991 16.1797 9.80489 16.3047C9.67986 16.4298 9.51029 16.5 9.33348 16.5V16.5ZM7.33348 13.5L8.66682 14.5V9.83333C8.66695 9.67011 8.72697 9.5126 8.83548 9.39067L13.6808 3.93933C13.8424 3.75672 13.9478 3.53136 13.9844 3.2903C14.0211 3.04924 13.9874 2.80274 13.8873 2.58037C13.7873 2.35801 13.6252 2.16924 13.4206 2.03673C13.2159 1.90421 12.9773 1.83359 12.7335 1.83333H3.26682C3.02312 1.8337 2.7847 1.90436 2.58015 2.03684C2.37561 2.16932 2.21362 2.358 2.11362 2.58023C2.01362 2.80247 1.97985 3.04884 2.01637 3.28979C2.05288 3.53074 2.15813 3.75604 2.31948 3.93867L7.16548 9.39067C7.27376 9.5127 7.33353 9.67019 7.33348 9.83333V13.5Z'
                        fill='#374957'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_104_2404'>
                        <rect
                          width='16'
                          height='16'
                          fill='white'
                          transform='translate(0 0.5)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              >
                Filter
              </Button>
            </Box>
          </Box>
        </Flex>
        <Center w='full'>
          <Box
            mt={{ base: 2, md: 0 }}
            w={{ base: '95%', md: '867px' }}
            position='relative'
          >
            {openMoreCategory && (
              <Box
                minW={{ base: 'full', md: '867px' }}
                padding={{ base: 2, md: '40px 32px' }}
                // mt='15px'
                ref={refCategory}
                border='1px solid #B4C6D5'
                borderRadius='8px'
                // as={motion.div}
                // initial={false}
                // animate={openMoreCategory ? 'open' : 'closed'}
                position='absolute'
                zIndex='1000000'
                bgColor='#FCFEFF'
                // borderRadius='8px'
                // variants={variants}
              >
                <Flex
                  // justifyContent='space-between'
                  flexWrap='wrap'
                  my='3'
                  // alignItems='center'
                  gap='15px'
                >
                  {listCategory.map((category, index) => (
                    <Button
                      bgColor={
                        filterBrand.selectedCategory === category._id
                          ? '#09BC8A'
                          : 'initial'
                      }
                      borderColor='#172A3A'
                      colorScheme='#172A3A'
                      border={
                        filterBrand.selectedCategory === category._id
                          ? '1px solid whte'
                          : '1px solid #172A3A'
                      }
                      borderRadius='24px'
                      fontWeight='400'
                      fontSize='14px'
                      color={
                        filterBrand.selectedCategory === category._id
                          ? 'white'
                          : 'initial'
                      }
                      key={index}
                      onClick={() => handleFilterCategory(category._id)}
                      variant='outline'
                    >
                      {category.name}
                    </Button>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        </Center>
        <Drawer
          isOpen={modalFilterMobile.isOpen}
          placement='bottom'
          onClose={() => modalFilterMobile.onClose()}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bgColor='transparent'>
            <DrawerBody
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px -4px 8px rgba(0, 0, 0, 0.06)'
              borderRadius='16px 16px 0px 0px'
              maxH='60vh'
              bgColor='white'
              p='0'
            >
              <Center mt='9px'>
                <Box
                  width='56px'
                  height='4.13px'
                  bgColor='#AFC2D1'
                  borderRadius='24px'
                />
              </Center>
              <Box mt='30px' px='16px'>
                <Text
                  fontWeight='500'
                  fontSize='14px'
                  lineHeight='17px'
                  color='#172A3A'
                >
                  Filter
                </Text>
                <Flex
                  mt='4'
                  justifyContent='center'
                  flexWrap='wrap'
                  alignItems='center'
                  gap='15px'
                >
                  <Button
                    onClick={() =>
                      clearFilterBrand({ isCategory: true, isKeyword: true })
                    }
                    color='white'
                    bgColor={
                      filterBrand.selectedCategory ? 'gray.500' : '#09BC8A'
                    }
                    p='8px 12px 8px 12px'
                    variant='outline'
                    fontWeight='400'
                    fontSize='14px'
                    border='1px solid #FBFFFE'
                    borderRadius='24px'
                  >
                    All
                  </Button>
                  {listCategory.map((category, index) => (
                    <Button
                      p='8px 12px 8px 12px'
                      bgColor={
                        filterBrand.selectedCategory === category._id
                          ? '#09BC8A'
                          : 'initial'
                      }
                      borderColor='#172A3A'
                      colorScheme='#172A3A'
                      border={
                        filterBrand.selectedCategory === category._id
                          ? '1px solid whte'
                          : '1px solid #172A3A'
                      }
                      borderRadius='24px'
                      fontWeight='400'
                      fontSize='14px'
                      lineHeight='17px'
                      color={
                        filterBrand.selectedCategory === category._id
                          ? 'white'
                          : '#172A3A'
                      }
                      key={index}
                      onClick={() => handleFilterCategory(category._id)}
                      variant='outline'
                    >
                      {category.name}
                    </Button>
                  ))}
                </Flex>
                <Button
                  mt='29px'
                  mb='27px'
                  w='full'
                  color='white'
                  bgColor='#09BC8A'
                  borderRadius='12px'
                  fontWeight='500'
                  fontSize='14px'
                  lineHeight='17px'
                >
                  Update Filter
                </Button>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box mt='50px'>
          {renderBrand()}
          {/* <GridImage />
          <Box mt={{ base: '10px', md: '80px' }} />
          <GridImage />
          <Box mt={{ base: '10px', md: '80px' }} />
          <GridImage /> */}
        </Box>
      </AppTemplate>
    </Layout>
  );
};

export default Explore;

interface IGridImage {
  brands: IBrand[];
}
const GridImage: React.FC<IGridImage> = (props) => {
  return (
    <SimpleGrid
      // padding={{ md: 4 }}
      w='full'
      // gap='48px'
      // column={[2, 3, 4]}
      minChildWidth={{ base: '155px', md: '240px' }}
      spacing={{ base: 1, md: '30px', xl: '48px' }}
      justifyContent={{ base: 'center', md: 'initial' }}
    >
      {props.brands.map((brand, i) => (
        <Link href={`/brand/${brand._id}`} key={i}>
          <Box
            mb={{ base: 2, md: 0 }}
            w={{ base: '155px', md: '240px' }}
            _hover={{ cursor: 'pointer' }}
          >
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
                width={{ base: '130px', md: '174px' }}
                height='56px'
                objectFit='contain'
                objectPosition='center'
              />
            </Flex>
            <Box mt='18px' padding='8px'>
              <Text
                fontWeight={{ base: '600', md: '700' }}
                fontSize={{ base: '18px', md: '20px' }}
                lineHeight={{ base: '21px', md: '24px' }}
                textAlign='left'
                color='black'
              >
                {brand.brandName}
              </Text>
              <Text
                mt='4px'
                color='black'
                textAlign='left'
                fontWeight='400'
                fontSize={{ base: '12px', md: '16px' }}
                lineHeight='19px'
              >
                Last updated{' '}
                {brand.updated_at
                  ? moment(brand.updated_at).format('DD MMM')
                  : moment(brand.created_at).format('DD MMM')}
              </Text>
              {/* <Text
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
              </Text> */}
              {brand.tags.length > 0 && (
                <HStack
                  flexDirection={{ base: 'column', md: 'row' }}
                  mt='12px'
                  alignItems='flex-start'
                >
                  {brand.tags.map((tag, i) => (
                    <Text
                      margin='0 !important'
                      fontWeight='400'
                      fontSize='14px'
                      lineHeight='17px'
                      color='#3E97FF'
                      key={i}
                    >
                      #{tag}
                    </Text>
                  ))}
                </HStack>
              )}
            </Box>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );
};
