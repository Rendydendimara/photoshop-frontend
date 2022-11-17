import { Button, IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { IBrand } from 'interfaces/IBrand';
import { ApiGetDetailBrand } from 'api/brand';
import {
  ApiGetListImageByBrandId,
  ApiGetListModuleByBrandId,
} from 'api/images';
import { IImage } from 'interfaces/Image';
import { IModule } from 'interfaces/IModule';
import moment from 'moment';
import { groupBy } from 'lodash';
import { setLocal } from 'lib/localStorage';
import { LOCAL_COMPARE } from 'constant/local';
import {
  getLocalCookie,
  localCookieSaveToken,
  setLocalCookie,
} from 'lib/Cookies/AppCookies';
import { MoreIcon } from 'components/atoms/icons/more-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';

const BrandIndex: NextPage = () => {
  const [showContentBrand, setShowContentBrand] = useState(false);
  const [mtSamiliarBrand, setMtSamiliarBrand] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [brand, setBrand] = useState<IBrand>();
  const [imagesBrand, setImagesBrand] = useState<
    {
      moduleName: string;
      images: IImage[];
    }[]
  >([]);
  const [moduleBrand, setModuleBrand] = useState<IModule[]>([]);
  const [brandId, setBrandId] = useState('');
  const [listCheckedModule, setListCheckedModule] = useState<string[]>([]);
  const [listImageSelectedModule, setListImageSelectedModule] = useState<
    IImage[]
  >([]);
  const [filterContent, setFilterContent] = useState<string[]>([]);

  const onChangeFilterContent = (e: any) => {
    let newFilter: any[] = [];
    if (filterContent.includes(e.target.name)) {
      newFilter = filterContent.filter((flow) => flow !== e.target.name);
    } else {
      newFilter = [...filterContent, e.target.name];
    }
    setFilterContent(newFilter);
  };

  const onOpenImage = async (moduleName: string) => {
    onOpen();
    const res = await ApiGetListImageByBrandId({
      brandId: brandId,
      moduleFolder: moduleName,
    });
    if (res.status === 200) {
      setListImageSelectedModule(res.data.data);
    }
  };

  const getDetailBrand = async (brandId: string) => {
    const res = await ApiGetDetailBrand(brandId);
    if (res.status === 200) {
      setBrand(res.data.data);
    }
  };

  const getImageBrand = async (filter: {
    brandId: string;
    moduleFolder?: string;
    flows?: string[];
  }) => {
    const res = await ApiGetListImageByBrandId(filter);
    if (res.status === 200) {
      const data = groupBy(res.data.data, 'folder');
      let temp: {
        moduleName: string;
        images: IImage[];
      }[] = [];
      for (const module in data) {
        if (filter.flows && filter.flows.length > 0) {
          if (filter.flows.includes(module)) {
            temp.push({
              moduleName: module,
              images: data[module],
            });
          }
        } else {
          temp.push({
            moduleName: module,
            images: data[module],
          });
        }
      }
      setImagesBrand(temp);
    }
  };

  const getListModuleBrand = async (brandId: string) => {
    const res = await ApiGetListModuleByBrandId(brandId);
    if (res.status === 200) {
      setModuleBrand(res.data.data);
    }
  };

  const handleChangeModuleCheckbox = (e: any) => {
    getImageBrand({ brandId: brandId });
    if (e.target.checked) {
      setListCheckedModule([...listCheckedModule, e.target.name]);
    } else {
      let temp = listCheckedModule.filter((module) => module !== e.target.name);
      setListCheckedModule(temp);
    }
  };

  const handleCompare = () => {
    setLocalCookie(LOCAL_COMPARE[1].brandId, brandId);
    setLocalCookie(LOCAL_COMPARE[1].listModule, listCheckedModule);
    router.push('/compare');
  };

  const filterBrandImages = () => {
    if (listCheckedModule.length === 0) {
      return imagesBrand;
    }
    let result = imagesBrand.filter((brand) =>
      listCheckedModule.includes(brand.moduleName)
    );
    return result;
  };

  // useEffect(() => {
  //   // Get the navbar
  //   let navbar: any;

  //   if (typeof window !== 'undefined') {
  //     navbar = document.getElementById('brandInfoSection');
  //   }

  //   // Get the offset position of the navbar
  //   let sticky: any = navbar?.offsetTop;
  //   // When the user scrolls the page, execute myFunction
  //   if (typeof window !== 'undefined') {
  //     window.onscroll = function () {
  //       handleScroll();
  //     };
  //   }

  //   function handleScroll() {
  //     console.log('window.pageYOffset', window.pageYOffset);
  //     console.log('sticky', sticky);
  //     // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  //     if (window.pageYOffset >= sticky) {
  //       navbar.classList.add('stickyBrandAbout');
  //     } else {
  //       navbar.classList.remove('stickyBrandAbout');
  //     }
  //   }
  // });

  useEffect(() => {
    const { id, showContent, flows }: any = router.query;
    // showContent
    if (id) {
      setBrandId(id);
      getDetailBrand(id);
      getListModuleBrand(id);
      getImageBrand({
        brandId: id,
        flows: flows ? flows.split(',') : undefined,
      });
    }
    if (showContent === 'true') {
      setShowContentBrand(true);
    }
  }, [router.query]);

  useEffect(() => {
    let box: any = document.querySelector('#brandImage');
    setMtSamiliarBrand(box?.offsetHeight ?? 0);
  });

  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Brand</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate
        px={{
          sm: '0',
          md: '0',
          xl: '0',
        }}
      >
        <Box mt='32px' mb='260px'>
          {/* Brand Info */}
          <Flex id='categoryDeskop' justifyContent='center'>
            <Flex
              maxW='1200px'
              // bgColor='red'
              bgColor='white'
              w='full'
              justifyContent='space-between'
              // position='fixed'
              display={{ base: 'none', md: 'flex' }}
              alignItems='center'
              p='12px'
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
              borderRadius='8px'
            >
              <Box>
                <Image
                  src={
                    brand?.brandImage === undefined ||
                    brand?.brandImage.length === 0
                      ? '/images/shoope.png'
                      : brand.brandImage
                  }
                  alt='shoope logo'
                  width='130px'
                  height='56px'
                  objectFit='contain'
                  objectPosition='center'
                />
                <Flex gap='4px' mt='8px' alignItems='center'>
                  <Text
                    fontWeight='600'
                    fontSize='14px'
                    lineHeight='17px'
                    color='#172A3A'
                  >
                    {brand?.brandName}
                  </Text>

                  <Text
                    fontWeight='400'
                    fontSize='12px'
                    lineHeight='14px'
                    color='#8FA2B1'
                  >
                    - Online Groceries
                  </Text>
                </Flex>
              </Box>
              <Flex gap='12px'>
                <Button
                  color='white'
                  fontSize='20px'
                  fontWeight='500'
                  variant='solid'
                  w='120px'
                  bgColor='#09BC8A'
                  h='48px'
                  onClick={handleCompare}
                >
                  Compare
                </Button>
                <IconButton
                  h='auto'
                  bgColor='transparent'
                  width='56px'
                  border='1px solid #8FA2B1'
                  borderRadius='8px'
                  aria-label='More'
                  icon={<MoreIcon />}
                />
              </Flex>
            </Flex>
          </Flex>
          {/* Brand Data */}
          <Flex
            mt='52px'
            w='full'
            gap='48px'
            alignItems='flex-start'
            zIndex='10'
          >
            <Box w={{ base: '100%', md: '25%', xl: '250px' }}>
              {/* Content */}
              {showContentBrand && (
                <Box
                  padding='38px 32px 22px 28px'
                  boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                  borderRadius='8px'
                  w='240px'
                  mb='32px'
                >
                  <Text
                    fontWeight='500'
                    fontSize='16px'
                    lineHeight='19px'
                    color='#172A3A'
                  >
                    Content
                  </Text>
                  <Flex flexDirection='column' gap='20px' mt='32px'>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Checkbox
                        colorScheme=''
                        onChange={onChangeFilterContent}
                        icon={
                          filterContent.includes('images') ? (
                            <CheckboxCheckedIcon />
                          ) : (
                            <CheckboxIcon />
                          )
                        }
                        name='images'
                      >
                        <Text
                          fontWeight='400'
                          fontSize='14px'
                          lineHeight='17px'
                          color='#172A3A'
                          as='span'
                          ml='4px'
                          textTransform='capitalize'
                        >
                          Images
                        </Text>
                      </Checkbox>
                      <Text
                        fontWeight='400'
                        fontSize='12px'
                        lineHeight='14px'
                        color='#8FA2B1'
                      >
                        (5)
                      </Text>
                    </Flex>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Checkbox
                        colorScheme=''
                        onChange={onChangeFilterContent}
                        icon={
                          filterContent.includes('video') ? (
                            <CheckboxCheckedIcon />
                          ) : (
                            <CheckboxIcon />
                          )
                        }
                        name='video'
                      >
                        <Text
                          fontWeight='400'
                          fontSize='14px'
                          lineHeight='17px'
                          color='#172A3A'
                          as='span'
                          ml='4px'
                          textTransform='capitalize'
                        >
                          Video
                        </Text>
                      </Checkbox>
                      <Text
                        fontWeight='400'
                        fontSize='12px'
                        lineHeight='14px'
                        color='#8FA2B1'
                      >
                        (5)
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              )}
              {/* Modules */}
              <Box
                padding='38px 32px 22px 28px'
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='8px'
                w='240px'
              >
                <Text
                  fontWeight='500'
                  fontSize='16px'
                  lineHeight='19px'
                  color='#172A3A'
                >
                  Flow
                </Text>
                <Flex flexDirection='column' gap='20px' mt='32px'>
                  {moduleBrand.map((module, i) => (
                    <Flex
                      justifyContent='space-between'
                      alignItems='center'
                      key={i}
                    >
                      <Checkbox
                        name={module._id}
                        onChange={handleChangeModuleCheckbox}
                        className='checboxBlack'
                        colorScheme=''
                        icon={
                          listCheckedModule.includes(module._id) ? (
                            <CheckboxCheckedIcon />
                          ) : (
                            <CheckboxIcon />
                          )
                        }
                      >
                        <Text
                          fontWeight='400'
                          fontSize='14px'
                          lineHeight='17px'
                          color='#172A3A'
                          as='span'
                          ml='4px'
                          textTransform='capitalize'
                        >
                          {module._id}
                        </Text>
                      </Checkbox>
                      <Text
                        fontWeight='400'
                        fontSize='12px'
                        lineHeight='14px'
                        color='#8FA2B1'
                      >
                        ({module.count})
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </Box>
            {/* Brand Images */}
            <Box
              overflowY='scroll'
              maxH='100vh'
              id='brandImage'
              className='styled-scrollbar'
              position='absolute'
              left={{ base: '30%', '2xl': '42%' }}
            >
              {filterBrandImages().map((imgBrand, i) => (
                <Box key={i}>
                  <ListImage
                    moduleName={imgBrand.moduleName}
                    images={imgBrand.images}
                    onClickImage={onOpenImage}
                  />
                  <Box mt={{ base: '20px', md: '30px', xl: '48px' }} />
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
        {/* Samiliar Brand */}
        <Flex
          gap='42px'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          w='full'
          bgColor='#FBFFFE'
          py='48px'
          zIndex='1'
          mb='70px'
          mt={`${mtSamiliarBrand - 300}px`}
        >
          <Text
            fontWeight='700'
            fontSize='16px'
            lineHeight='19px'
            color='#09BC8A'
          >
            Simillar Brand
          </Text>
          <Flex alignItems='center' gap='32px' justifyContent='center'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Flex
                key={item}
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='12px'
                justifyContent='center'
                alignItems='center'
                width='122px'
                height='97px'
              >
                <Image
                  src={
                    brand?.brandImage === undefined ||
                    brand?.brandImage.length === 0
                      ? '/images/shoope.png'
                      : brand.brandImage
                  }
                  alt='shoope logo'
                  width='74px'
                  height='100%'
                  objectFit='contain'
                  objectPosition='center'
                />
              </Flex>
            ))}
          </Flex>
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
              <Flex
                mt='24px'
                gap='48px'
                w='full'
                h='100%'
                justifyContent='center'
              >
                {listImageSelectedModule.map((image, i) => (
                  <ImageChakra
                    src={image.imagePath}
                    alt={image.filename}
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

interface IListImage {
  moduleName: string;
  images: IImage[];
  onClickImage: (moduleName: string) => void;
}
const ListImage: React.FC<IListImage> = (props) => {
  return (
    <Box>
      <Text
        color='#09BC8A'
        textTransform='capitalize'
        fontWeight='700'
        fontSize='20px'
        lineHeight='24px'
      >
        {props.moduleName}
      </Text>
      <Flex
        mt='24px'
        gap='48px'
        alignItems='center'
        maxW='full'
        overflowX='scroll'
        className='styled-scrollbar'
      >
        {props.images.map((image, i) => (
          <ImageChakra
            onClick={() => props.onClickImage(image.folder)}
            src={image.imagePath}
            alt={image.filename}
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
