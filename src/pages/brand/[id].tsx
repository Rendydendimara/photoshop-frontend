import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Center, Flex, Heading, HStack, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { logEvent } from '@firebase/analytics';
import { ApiGetDetailBrand } from 'api/brand';
import { ApiGetListImageByBrandId } from 'api/images';
import { ApiFindModuleByBrand } from 'api/module';
import { ApiGetListScreenByModuleAndBrandId } from 'api/screen';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import FilterCheckbox from 'components/molecules/FilterCheckbox';
import CheckboxItem from 'components/molecules/FilterCheckbox/CheckboxItem';
import Footer from 'components/molecules/Footer';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { LOCAL_COMPARE } from 'constant/local';
import BrandCompareIcon from 'icons/brandCompare.svg';
import { IBrand, IBrandV2 } from 'interfaces/IBrand';
import { IImage } from 'interfaces/Image';
import { IModule } from 'interfaces/IModule';
import { setLocalCookie } from 'lib/Cookies/AppCookies';
import { analytics } from 'lib/firebase';
import { groupBy } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { shimmer, toBase64 } from 'utils/imageOptimization';

interface IModuleV2 {
  _id: string;
  name: string;
  images: string[];
}

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
  const [listModule, setListModule] = useState<IModuleV2[]>([]);
  const [brandV2, setBrandV2] = useState<IBrandV2>();
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
    string[]
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

  const onOpenImage = async (moduleId: string) => {
    onOpen();
    // const res = await ApiGetListImageByBrandId({
    //   brandId: brandId,
    //   moduleFolder: moduleName,
    // });
    const res = await ApiGetListScreenByModuleAndBrandId(brandId, moduleId);
    if (res.status === 200) {
      setListImageSelectedModule(res.data.data.images);
    }
  };

  const getDetailBrand = async (brandId: string) => {
    const res = await ApiGetDetailBrand(brandId);
    if (res.status === 200) {
      setBrandV2(res.data.data);
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
    const res = await ApiFindModuleByBrand(brandId);
    if (res.status === 200) {
      let countAll = 0;
      let allImages: any = [];
      let tempModule: any[] = [];
      for (const module of res?.data?.data ?? []) {
        countAll += module.images.length;
        allImages = [...allImages, ...module.images];
        tempModule.push({
          _id: module.module._id,
          name: module.module.name,
          images: module.images,
        });
      }
      setListModule([
        {
          _id: 'All',
          name: 'All',
          images: allImages,
          module: {
            _id: 'All',
            name: 'All',
            hashtag: [],
          },
        },
        ...tempModule,
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
      let result = listModule.filter((mod) => mod._id !== 'All');
      return result;
    }
    let result = listModule.filter((mod) => filterContent.includes(mod._id));
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
    let sidebarLeft: any;

    if (typeof window !== 'undefined') {
      sidebarLeft = document.getElementById('sidebarLeft');
    }

    // Get the offset position of the navbar
    let sticky: any = sidebarLeft?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      window.onscroll = function () {
        handleScroll();
      };
    }

    function handleScroll() {
      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      if (window.pageYOffset >= sticky + 57) {
        sidebarLeft.classList.add('sidebarLeftBrandDetail');
      } else {
        sidebarLeft.classList.remove('sidebarLeftBrandDetail');
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
        <Box w='full' mt='32px' mb='68px'>
          {/* Breadcrumb */}
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center' gap='4px'>
              <Text
                fontWeight='400'
                fontSize='14px'
                lineHeight='21px'
                color='#000000'
              >
                Home
              </Text>
              <Text
                fontWeight='400'
                fontSize='14px'
                lineHeight='21px'
                color='#000000'
              >
                /
              </Text>
              <Text
                fontWeight='600'
                fontSize='14px'
                lineHeight='21px'
                color='#000000'
              >
                {brand?.brandName}
              </Text>
            </Flex>
            <Button
              leftIcon={<BrandCompareIcon />}
              onClick={handleCompare}
              h='40px'
              bgColor='#07A377'
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
              borderRadius='8px'
              color='white'
              fontWeight='500'
              fontSize='14px'
              lineHeight='21px'
            >
              Compare This Brand
            </Button>
          </Flex>
          {/* Brand Detail */}
          <Box
            // flexDirection={{ base: 'column', md: 'row' }}
            // mt={{ base: '32px', md: 0 }}
            // gap='52px'
            position='relative'
            mt='6px'
          >
            {/* Brand Info */}
            <Box id='sidebarLeft' maxW='248px'>
              <Center
                p='5'
                width='248px'
                height='123px'
                border='1px solid #EFEFEF'
                borderRadius='15px'
                objectPosition='relative'
              >
                <Image
                  src={
                    brandV2?.logoSmall === undefined ||
                    brandV2?.logoSmall.length === 0
                      ? '/images/shoope.png'
                      : brandV2.logoSmall
                  }
                  alt='shoope logo'
                  objectFit='contain'
                  objectPosition='center'
                  width={120}
                  height={100}
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 700)
                  )}`}
                />
              </Center>
              <Box mt='12px'>
                <Heading
                  as='h2'
                  fontWeight='700'
                  fontSize={{ base: '24px' }}
                  color='#172A3A'
                  textAlign='left'
                >
                  {brandV2?.name}
                </Heading>
                <HStack spacing={2} justifyContent='flex-start'>
                  {brandV2?.category.map((category, i) => (
                    <Text
                      key={i}
                      mt='4px'
                      color='#B4C6D5'
                      textAlign='center'
                      fontWeight='400'
                      fontSize='12px'
                      lineHeight='14px'
                    >
                      {category.name}
                    </Text>
                  ))}
                </HStack>
              </Box>
              <Box
                mt='12px'
                bgColor='#EEF4F9'
                borderRadius='4px'
                padding='12px 16px'
                w='full'
                maxW='477px'
              >
                <Text
                  textAlign='left'
                  fontWeight='400'
                  fontSize='14px'
                  color='#172A3A'
                  w='full'
                >
                  {brandV2?.description
                    ? brandV2?.description
                    : "Digitalisation of animal and plant markets by the nation's children to provide a place for the community of flora and fauna lovers and new players in fauna & flora."}
                </Text>
              </Box>
              <Box mt='16px'>
                <FilterCheckbox labelName='Flow'>
                  {listModule.map((module, i) => (
                    <CheckboxItem
                      key={i}
                      marginBtm={i + 1 === listModule.length ? 0 : '12px'}
                      icon={
                        filterContent.includes(module._id) ? (
                          <CheckboxCheckedIcon />
                        ) : (
                          <CheckboxIcon />
                        )
                      }
                      value={module._id}
                      onChange={() =>
                        onChangeFilterContent({ target: { name: module._id } })
                      }
                      fontWeight={
                        filterContent.includes(module._id) ? '600' : '400'
                      }
                      name={module.name}
                      colorCount={
                        filterContent.includes(module._id)
                          ? '#172A3A'
                          : '#8FA2B1'
                      }
                      totalCount={module.images.length}
                    />
                  ))}
                </FilterCheckbox>
              </Box>
            </Box>
            {/* Brand Image */}
            <Box
              position={{ base: 'initial', md: 'absolute' }}
              zIndex='1000'
              w={{ md: '78%', xl: '90%' }}
              left='300px'
              top='0'

              // ml={{ base: 0, md: isFixedPositionSidebar ? '60px' : 0 }}
            >
              <Box w={{ base: 'full', md: 'full' }} id='brandImage'>
                {filterBrandImages().map((imgBrand, i) => (
                  <Box key={i}>
                    <ListImage module={imgBrand} onClickImage={onOpenImage} />
                    <Box mt={{ base: '20px', md: '30px', xl: '48px' }} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box mt={mtSamiliarBrand + 100}>
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
                overflowX={
                  listImageSelectedModule.length < 3 ? 'unset' : 'scroll'
                }
                className={
                  listImageSelectedModule.length < 3 ? '' : 'styled-scrollbar'
                }
                justifyContent='center'
                pb='20px'
              >
                {listImageSelectedModule.map((image, i) => (
                  <Image
                    src={image}
                    alt={image}
                    width={480}
                    height={853.33}
                    key={i}
                    style={{
                      cursor: 'pointer',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 700)
                    )}`}
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
  module: IModuleV2;
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
        {props.module.name}
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
        {props.module.images.map((image, i) => (
          <Image
            onClick={() => props.onClickImage(props.module._id)}
            src={image}
            alt={image}
            width={360}
            height={640}
            objectFit='contain'
            objectPosition='center'
            key={i}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              border: '2px solid #172A3A',
              marginRight: i + 1 === props.module.images.length ? '10px' : 0,
            }}
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 700)
            )}`}
          />
        ))}
      </Flex>
    </Box>
  );
};
