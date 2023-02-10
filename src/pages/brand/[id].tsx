import { Button, IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image as ImageChakra } from '@chakra-ui/image';
import { Box, Center, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
import { filter, groupBy } from 'lodash';
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
import FilterCheckbox from 'components/molecules/FilterCheckbox';
import CheckboxItem from 'components/molecules/FilterCheckbox/CheckboxItem';
import { GAEvent, ReactGA } from 'lib/ga';
import { logEvent } from '@firebase/analytics';
import { analytics } from 'lib/firebase';
import Footer from 'components/molecules/Footer';

const FILTER_CONTENT = [
  {
    value: 'images',
    name: 'Images',
    count: 5,
  },
  {
    value: 'video',
    name: 'Video',
    count: 5,
  },
];
const BrandIndex: NextPage = () => {
  const refContainerImages: any = useRef(null);
  const [heightContainerImages, setHeightContainerImages] = useState(0);
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
    if (e.target.name === 'All' && newFilter.includes('All')) {
      newFilter = ['All'];
    } else {
      if (newFilter.includes('All')) {
        newFilter = newFilter.filter((cat) => cat !== 'All');
      }
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
      setModuleBrand([
        {
          _id: 'All',
          count: 0,
        },
        ...res.data.data,
      ]);
      setFilterContent(['All']);
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
    // GAEvent({
    //   action: 'on-click-compare-button',
    //   params: JSON.stringify({
    //     data: {
    //       brandName: brand?.brandName ?? '',
    //       brandId: brandId,
    //     },
    //   }),
    // });
    // ReactGA.event({
    //   category: 'Brand',
    //   action: `Compare brand ${brandId}`,
    // });
    logEvent(analytics, 'select_content', {
      category: 'BrandCompare',
      value: `compare brand ${brandId}`,
    });
    router.push('/compare');
  };

  const filterBrandImages = () => {
    if (filterContent.length === 0 || filterContent.includes('All')) {
      return imagesBrand;
    }
    let result = imagesBrand.filter((brand) =>
      filterContent.includes(brand.moduleName)
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
    setHeightContainerImages(refContainerImages?.current?.clientHeight ?? 0);
  });

  useEffect(() => {
    // Get the navbar
    let modulesBrand: any;

    if (typeof window !== 'undefined') {
      modulesBrand = document.getElementById('listModuleBrand');
    }

    // Get the offset position of the modulesBrand
    let sticky: any = modulesBrand?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      window.onscroll = function () {
        handleScroll();
      };
    }

    function handleScroll() {
      // Add the sticky class to the modulesBrand when you reach its scroll position. Remove "sticky" when you leave the scroll position
      if (window.pageYOffset >= sticky + 250) {
        modulesBrand.classList.add('stickyListModuleBrand');
      } else {
        modulesBrand.classList.remove('stickyListModuleBrand');
      }
    }
  });

  return (
    <Layout hideFooter showNavbarFooter>
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
        <Box w='full' mt='22px' mb='68px'>
          {/* Brand Info */}
          <Box w='full' px={{ base: '16px', md: 0 }} bgColor='white'>
            <Center>
              <ImageChakra
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
            </Center>
            <Heading
              as='h2'
              fontWeight='700'
              fontSize={{ base: '24px', md: '48px' }}
              color='#172A3A'
              textAlign='center'
            >
              {brand?.brandName}
            </Heading>
            <Text
              textAlign='center'
              fontWeight='400'
              fontSize={{ base: '14px', md: '16px' }}
              color='#172A3A'
            >
              {brand?.category_id.name}
            </Text>
            <Center w='full'>
              <Box
                mt='12px'
                bgColor='#EEF4F9'
                borderRadius='4px'
                padding='12px 16px'
                w='full'
                maxW='477px'
              >
                <Text
                  textAlign='center'
                  fontWeight='400'
                  fontSize='14px'
                  color='#172A3A'
                  w='full'
                >
                  {brand?.description
                    ? brand?.description
                    : "Digitalisation of animal and plant markets by the nation's children to provide a place for the community of flora and fauna lovers and new players in fauna & flora."}
                </Text>
              </Box>
            </Center>
          </Box>
          {/* List Module Brand */}
          <Flex
            justifyContent='center'
            alignItems='center'
            w='full'
            gap={{ base: '10px', md: 0 }}
            position='relative'
            ml={{ base: '16px', md: 0 }}
          >
            <Flex
              justifyContent='center'
              w='full'
              bgColor={isOpen ? 'transparent !important' : 'white'}
              id='listModuleBrand'
            >
              <HStack
                bgColor='white'
                py='16px'
                // px={{ base: '200px', md: 0 }}
                maxW='1200px'
                // w='full'
                justifyContent={{ base: 'flex-start', md: 'center' }}
                borderRadius='4px'
                display='-webkit-inline-box'
                gap='16px'
                overflowX='scroll'
                className='styled-scrollbar'
                // flexWrap={{ base: 'unset', md: 'wrap' }}
              >
                {moduleBrand.map((module, i) => (
                  <Button
                    display='flex'
                    fontSize='14px'
                    key={i}
                    _hover={{ cursor: 'pointer' }}
                    p='6px 8px'
                    borderRadius='8px'
                    bgColor={
                      filterContent.includes(module._id)
                        ? '#09BC8A'
                        : 'transparent'
                    }
                    fontWeight={
                      filterContent.includes(module._id) ? '700' : '400'
                    }
                    color={
                      filterContent.includes(module._id) ? '#FBFFFE' : '#172A3A'
                    }
                    onClick={() =>
                      onChangeFilterContent({ target: { name: module._id } })
                    }
                    minW='fit-content'
                    w='fit-content'
                  >
                    {module._id}
                  </Button>
                ))}
              </HStack>
            </Flex>
          </Flex>
          {/* Brand Images */}
          <Box
            mt='53px'
            w='full'
            // overflowY='scroll'
            // maxH='100vh'
            // id='brandImage'
            ref={refContainerImages}
            // className='styled-scrollbar'
            position='absolute'
            // left="20%"
            overflowX='hidden'
            maxW={screen.width + 30}
            pl={{ base: '16px', md: 0 }}
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
          <Box mt={heightContainerImages + 100}>
            <Footer />
          </Box>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered size='6xl'>
          <ModalOverlay bg='rgba(9, 9, 9, 0.8)' />
          <ModalContent
            // className='styled-scrollbar'
            bgColor='transparent'
            border='unset'
            maxH='90vh'
            w='full'
            maxW='90%'
            boxShadow='unset'
            // overflow='scroll'
          >
            <ModalBody w='full' border='unset'>
              <Flex
                mt='24px'
                gap='48px'
                w='full'
                h='100%'
                display='-webkit-inline-box'
                overflowX='scroll'
                className='styled-scrollbar'
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
        <Button
          onClick={handleCompare}
          colorScheme='green'
          position='fixed'
          bottom='20px'
          right='20px'
          size='lg'
        >
          Compare
        </Button>
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
        display='-webkit-inline-box'
        justifyContent='center'
        overflowX='scroll'
        className='styled-scrollbar'
        pb='12px'
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
            borderRadius='8px'
            border='2px solid #172A3A'
            marginRight={i + 1 === props.images.length ? '10px' : 0}
          />
        ))}
      </Flex>
    </Box>
  );
};
