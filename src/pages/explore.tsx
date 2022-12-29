import { Button, IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { SearchIcon } from 'components/atoms/icons/search-icon';
import { Box, Center, Flex, HStack, Text } from '@chakra-ui/layout';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal';
import {
  ApiFindBrandByModules,
  ApiGetDetailBrand,
  ApiGetListBrand,
  ApiGetListModules,
  ApiSearchBrand,
} from 'api/brand';
import { ApiGetListCategory } from 'api/category';
import { BrandIcon } from 'components/atoms/icons/brand-icon';
import { CategoryIcon } from 'components/atoms/icons/category-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import { FlowIcon } from 'components/atoms/icons/flow-icon';
import BrandReachBottom from 'components/molecules/BrandReachBottom';
import FilterTools from 'components/molecules/FilterTools';
import FilterPageView from 'components/molecules/FilterPageView';
import ListBrand from 'components/organims/ListBrand';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import {
  IBrand,
  IListBrandByFlow,
  IListFlow,
  ISearchBrand,
} from 'interfaces/IBrand';
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
import ListBrandFlowView from 'components/organims/ListBrandFlowView';
import CheckboxItem from 'components/molecules/FilterCheckbox/CheckboxItem';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';
import Footer from 'components/molecules/Footer';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
const KeyCodes = {
  comma: 188,
  enter: 13,
  tab: 9,
  space: 32,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab];

const FILTER_PRICE = [
  {
    value: 'FREE',
    name: 'FREE',
    count: 5,
  },
  {
    value: '$$$$',
    name: '$$$$',
    count: 5,
  },
  {
    value: '$$$',
    name: '$$$',
    count: 5,
  },
  {
    value: '$$',
    name: '$$',
    count: 5,
  },
  {
    value: '$',
    name: '$',
    count: 5,
  },
];
const Explore: NextPage = () => {
  let timer: any;
  const [filterPageView, setFilterPageView] = useState({
    brand: true,
    category: false,
    flow: false,
  });

  const height = ['529px', '600px', '350px', '500px', '429px', '400px'];
  const refCategory = useRef(null);
  const refSidebar: any = useRef(null);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [openMoreCategory, setOpenMoreCategory] = useState(false);
  const [loadingGetBrand, setLoadingGetBrand] = useState(false);
  const [isFixedPositionSidebar, setIsFixedPositionSidebar] = useState(false);
  const [listBrand, setListBrand] = useState<IBrand[]>([]);
  const [listBrandByFlow, setListBrandByFlow] = useState<IListBrandByFlow[]>(
    []
  );
  const inputSearchElement: any = useRef(null);
  const [listCategory, setListCategory] = useState<ICategory[]>([]);
  const [listFlow, setListFlow] = useState<IListFlow[]>([]);
  const modalFilterMobile = useDisclosure();
  const [filterBrand, setFilterBrand] = useState({
    selectedCategory: '',
    keyword: [],
  });
  const [filterBrandV2, setFilterBrandV2] = useState({
    selectedCategory: '',
    selectedBrand: '',
    selectedPrice: '',
  });
  const [filterBrandByFlow, setFilterBrandByFlow] = useState<{
    flows: string[];
    categories: string[];
    price: string[];
  }>({
    flows: [],
    categories: [],
    price: [],
  });
  const [resultSearchBrand, setResultSearchBrand] = useState<ISearchBrand>();
  const btnRef: any = useRef();
  const handleClickOutside = () => {
    setOpenMoreCategory(false);
  };

  useOnClickOutside(refCategory, handleClickOutside);
  const onChangeFilterPageView = (field: any) => {
    setFilterPageView({
      brand: field === 'brand' ? true : false,
      category: field === 'category' ? true : false,
      flow: field === 'flow' ? true : false,
    });
    if (field === 'brand') {
      handleGetListBrand({});
    }
    if (field === 'flow') {
      getListBrandByFlow({
        categories: [],
        flows: [],
      });
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

  // const removeKeyword = (keyword: string) => {
  //   const result = filterBrand.keyword.filter((key) => key !== keyword);
  //   setFilterBrand({
  //     ...filterBrand,
  //     keyword: result,
  //   });
  //   handleGetListBrand({
  //     category: filterBrand.selectedCategory,
  //     keyword: result,
  //   });
  // };

  const handleGetListBrand = async (filter: {
    category?: string[];
    notIncludeBrandId?: string[];
    keyword?: string[];
    module?: string[];
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
      let data = res.data.data;
      let dataResult: any = data;
      let countTotal = 0;
      if (data.length > 0) {
        data.forEach((dt: any) => {
          countTotal += dt.totalBrand;
        });
        dataResult = [
          {
            name: 'all',
            _id: 'all',
            created_at: '',
            totalBrand: countTotal,
          },
          ...data,
        ];
      }
      setListCategory(dataResult);
    }
  };

  const getListFlow = async () => {
    const res = await ApiGetListModules();
    if (res.status === 200) {
      let data = res.data.data;
      let dataResult: any = data;
      let countTotal = 0;
      if (data.length > 0) {
        // _id: string;
        // count: number;
        data.forEach((dt: any) => {
          countTotal += dt.count;
        });
        dataResult = [
          {
            _id: 'all',
            count: countTotal,
          },
          ...dataResult,
        ];
      }
      setListFlow(dataResult);
    }
  };

  const renderBrand = () => {
    if (filterPageView.brand) {
      return <ListBrand listBrand={listBrand} />;
    } else if (filterPageView.flow) {
      return (
        <ListBrandFlowView
          activeFlow={filterBrandByFlow.flows}
          listBrandByFlow={listBrandByFlow}
        />
      );
    }
  };

  // const handleFilterCategory = (idCategory: string) => {
  //   setFilterBrand({
  //     ...filterBrand,
  //     selectedCategory: idCategory,
  //   });
  //   handleGetListBrand({ keyword: filterBrand.keyword, category: idCategory });
  // };

  const handleKeyOnDownKeyword = (e: any) => {
    // if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 9) {
    //   let newKeyword: any = [...filterBrand.keyword, e.target.value];
    //   setFilterBrand({
    //     ...filterBrand,
    //     keyword: newKeyword,
    //   });
    //   e.target.value = '';
    //   handleGetListBrand({
    //     category: filterBrand.selectedCategory,
    //     keyword: newKeyword,
    //   });
    // }
  };

  const handleSearchingBrand = async (query: string) => {
    if (query !== '') {
      const res = await ApiSearchBrand({ keyword: query });
      if (res.status === 200) {
        setResultSearchBrand(res.data.data);
      }
    } else {
      handleGetListBrand({});
      setResultSearchBrand(undefined);
    }
  };

  const handleChangeSearch = (e: any) => {
    setKeywordSearch(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(handleSearchingBrand, 500, e.target.value);
  };

  const onClickFilterV2 = async (
    value: string,
    field: 'category' | 'brand' | 'price'
  ) => {
    if (field === 'brand') {
      setFilterBrandV2({
        selectedCategory: '',
        selectedBrand: value,
        selectedPrice: '',
      });
      const res = await ApiGetDetailBrand(value);
      if (res.status === 200) {
        setListBrand([res.data.data]);
      }
    } else if (field === 'category') {
      // handleGetListBrand({ category: value });
      setFilterBrandV2({
        selectedCategory: value,
        selectedBrand: '',
        selectedPrice: '',
      });
    } else {
      setFilterBrandV2({
        selectedCategory: '',
        selectedBrand: '',
        selectedPrice: value,
      });
    }
  };

  const getListBrandByFlow = async (filter: {
    flows: string[];
    categories: string[];
  }) => {
    const res = await ApiFindBrandByModules({
      category: filter.categories,
      moduleName: filter.flows,
    });
    if (res.status === 200) {
      setListBrandByFlow(res.data.data);
    } else {
      setListBrandByFlow([]);
    }
  };

  const onChangeFilterFlow = (e: any) => {
    let newFlows: any[] = [];
    if (filterBrandByFlow.flows.includes(e.target.name)) {
      newFlows = filterBrandByFlow.flows.filter(
        (flow) => flow !== e.target.name
      );
    } else {
      newFlows = [...filterBrandByFlow.flows, e.target.name];
    }
    if (e.target.name === 'all' && newFlows.includes('all')) {
      setFilterBrandByFlow({
        ...filterBrandByFlow,
        flows: ['all'],
      });
    } else {
      if (newFlows.includes('all')) {
        newFlows = newFlows.filter((cat) => cat !== 'all');
      }
      setFilterBrandByFlow({
        ...filterBrandByFlow,
        flows: newFlows,
      });
    }
    if (filterPageView.brand) {
      if (e.target.name === 'all' && newFlows.includes('all')) {
        handleGetListBrand({
          keyword: filterBrand.keyword,
          module: [],
          category: filterBrandByFlow.categories,
        });
      } else {
        handleGetListBrand({
          keyword: filterBrand.keyword,
          module: newFlows,
          category: filterBrandByFlow.categories,
        });
      }
    } else {
      if (e.target.name === 'all' && newFlows.includes('all')) {
        getListBrandByFlow({
          ...filterBrandByFlow,
          flows: [],
        });
      } else {
        getListBrandByFlow({
          ...filterBrandByFlow,
          flows: newFlows,
        });
      }
    }
    // getListBrandByFlow({
    //   ...filterBrandByFlow,
    //   flows: [],
    // });
    // if (newFlows.includes('all')) {
    //   newFlows = newFlows.filter((cat) => cat !== 'all');
    // }
    // setFilterBrandByFlow({
    //   ...filterBrandByFlow,
    //   flows: newFlows,
    // });
    // getListBrandByFlow({
    //   ...filterBrandByFlow,
    //   flows: newFlows,
    // });
  };
  const onChangeFilterCategory = (e: any) => {
    let newCategories: any[] = [];
    if (filterBrandByFlow.categories.includes(e.target.name)) {
      newCategories = filterBrandByFlow.categories.filter(
        (flow) => flow !== e.target.name
      );
    } else {
      newCategories = [...filterBrandByFlow.categories, e.target.name];
    }
    if (e.target.name === 'all' && newCategories.includes('all')) {
      setFilterBrandByFlow({
        ...filterBrandByFlow,
        categories: ['all'],
      });
    } else {
      if (newCategories.includes('all')) {
        newCategories = newCategories.filter((cat) => cat !== 'all');
      }
      setFilterBrandByFlow({
        ...filterBrandByFlow,
        categories: newCategories,
      });
    }
    if (filterPageView.brand) {
      if (e.target.name === 'all' && newCategories.includes('all')) {
        handleGetListBrand({
          keyword: filterBrand.keyword,
          category: ['all'],
          module: filterBrandByFlow.flows,
        });
      } else {
        handleGetListBrand({
          keyword: filterBrand.keyword,
          category: newCategories,
          module: filterBrandByFlow.flows,
        });
      }
    } else {
      if (e.target.name === 'all' && newCategories.includes('all')) {
        getListBrandByFlow({
          ...filterBrandByFlow,
          categories: [],
        });
      } else {
        getListBrandByFlow({
          ...filterBrandByFlow,
          categories: newCategories,
        });
      }
    }
  };
  const onChangeFilterPrice = (e: any) => {
    let newPrice: any[] = [];
    if (filterBrandByFlow.price.includes(e.target.name)) {
      newPrice = filterBrandByFlow.price.filter(
        (flow) => flow !== e.target.name
      );
    } else {
      newPrice = [...filterBrandByFlow.price, e.target.name];
    }
    setFilterBrandByFlow({
      ...filterBrandByFlow,
      price: newPrice,
    });
  };

  const checkMLSidebar = () => {
    if (refSidebar?.current?.classList.contains('stickySidebar')) {
      setIsFixedPositionSidebar(true);
    } else {
      setIsFixedPositionSidebar(false);
    }
  };

  const scrollOnTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (inputSearchElement) {
        if (inputSearchElement.current) {
          inputSearchElement.current.focus();
        }
      }
    }
  };

  const onRequest = () => {};

  const onClickModule = (name: string) => {
    onChangeFilterFlow({ target: { name: name } });
    modalFilterMobile.onClose();
  };
  const onClickCategory = (name: string) => {
    onChangeFilterCategory({ target: { name: name } });
    modalFilterMobile.onClose();
  };

  useEffect(() => {
    // Get the navbar
    let navbar: any;
    let sidebar: any;
    let filterMobile: any;

    if (typeof window !== 'undefined') {
      navbar = document.getElementById('categoryDeskop');
      sidebar = document.getElementById('sidebarContainer');
      filterMobile = document.getElementById('filterMobile');
    }

    // Get the offset position of the navbar
    let sticky: any = navbar?.offsetTop;
    let stickyMobile: any = filterMobile?.offsetTop;
    let stickySidebar: any = sidebar?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      window.onscroll = function () {
        handleScroll();
        checkMLSidebar();
        // console.log('useEffect isFixedPositionSidebar', isFixedPositionSidebar);
      };
    }

    function handleScroll() {
      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      if (window.pageYOffset >= sticky + 57) {
        navbar.classList.add('stickyNavbarHome');
        sidebar.classList.add('stickySidebar');
        filterMobile.classList.add('stickyFilterMobileHome');
        // stickyFilterMobileHome
        // if (!isFixedPositionSidebar) {
        // setIsFixedPositionSidebar(true);
        // }
      } else {
        navbar.classList.remove('stickyNavbarHome');
        sidebar.classList.remove('stickySidebar');
        filterMobile.classList.remove('stickyFilterMobileHome');
        // if (isFixedPositionSidebar) {
        //   // setIsFixedPositionSidebar(false);
        // }
      }
      // checkMLSidebar();
    }
  });
  // useEffect(() => {
  //   let timer: any;
  //   timer = setInterval(checkMLSidebar, 50);
  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   // window.onscroll = function () {
  //   //   checkMLSidebar();
  //   // console.log('useEffect isFixedPositionSidebar', isFixedPositionSidebar);
  //   // };
  //   // console.log('useEffect isFixedPositionSidebar', isFixedPositionSidebar);
  // });

  useEffect(() => {
    handleGetListBrand({});
    handleGetListCategory();
    getListFlow();
  }, []);

  return (
    <Layout hideFooter={true} showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Explore</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate
        px={{
          md: '0px',
          xl: '0px',
        }}
      >
        <Flex
          flexDirection={{ base: 'row', md: 'column' }}
          justifyContent={{ base: 'space-between', md: 'center' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          w='full'
          gap={{ base: '10px', md: 0 }}
          position='relative'
        >
          <Box
            w={{ base: 'initial', md: 'full' }}
            mt={{ base: '20px', xl: '32px' }}
          >
            <Flex
              display={{ base: 'none', md: 'initial' }}
              id='categoryDeskop'
              justifyContent='center'
            >
              <FilterPageView
                onChangeFilterPageView={onChangeFilterPageView}
                filterPageView={filterPageView}
                handleKeyOnDownKeyword={handleKeyOnDownKeyword}
                handleChangeSearch={handleChangeSearch}
                value={keywordSearch}
                inputSearchElement={inputSearchElement}
                onClickFilterV2={onClickFilterV2}
                filterBrandV2={filterBrandV2}
                resultSearchBrand={resultSearchBrand}
              />
            </Flex>
            {/* Category Mobile */}
            <Flex
              w='full'
              display={{ base: 'flex', md: 'none !important' }}
              justifyContent='space-between'
              id='filterMobile'
              bgColor='white'
              p='16px'
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
            >
              <InputGroup width='80%' bgColor='#FAFAFA'>
                <InputLeftElement
                  // display={{ base: 'flex', md: 'none' }}
                  pointerEvents='none'
                  mt='4px'
                  children={<SearchIcon showHover />}
                />
                <Input
                  height={{ base: '41px', md: '49px' }}
                  borderColor='transparent'
                  onChange={handleChangeSearch}
                  borderRadius='12px'
                  onKeyDown={handleKeyOnDownKeyword}
                  placeholder='Ex Gojek, Cart, or Fashion'
                  _placeholder={{
                    fontWeight: 300,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#B4C6D4',
                  }}
                  value={keywordSearch}
                />
              </InputGroup>
              <IconButton
                aria-label='filter'
                icon={
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
                        fill={
                          filterBrandByFlow.categories.length > 0 ||
                          filterBrandByFlow.flows.length > 0
                            ? '#FBFFFE'
                            : '#374957'
                        }
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
                variant='outline'
                bgColor={
                  filterBrandByFlow.categories.length > 0 ||
                  filterBrandByFlow.flows.length > 0
                    ? '#09BC8A'
                    : '#ECECEC'
                }
                // borderWidth='1px'
                ref={btnRef}
                onClick={() => {
                  modalFilterMobile.onOpen();
                }}
              />
            </Flex>
          </Box>
        </Flex>
        <Drawer
          isOpen={modalFilterMobile.isOpen}
          placement='bottom'
          onClose={() => modalFilterMobile.onClose()}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bgColor='transparent' zIndex='110000'>
            <DrawerBody
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px -4px 8px rgba(0, 0, 0, 0.06)'
              borderRadius='16px 16px 0px 0px'
              maxH='553px'
              bgColor='white'
              p='32px 28px 32px 28px'
            >
              <Tabs isFitted variant='soft-rounded' colorScheme='green'>
                <TabList>
                  <Tab
                    _selected={{
                      bgColor: '#F4F4F4',
                      color: '#09BC8A',
                    }}
                    fontWeight='500'
                    fontSize='16px'
                    display='flex'
                    alignItems='center'
                    gap='10px'
                    color='#B9B9B9'
                  >
                    Categories
                    {filterBrandByFlow.categories.length > 0 && (
                      <Flex
                        width='23px'
                        height='23px'
                        bgColor='#09BC8A'
                        justifyContent='center'
                        alignItems='center'
                        borderRadius='30px'
                        fontWeight='700'
                        fontSize='10px'
                        color='#FCFCFC'
                      >
                        {filterBrandByFlow.categories.length}
                      </Flex>
                    )}
                  </Tab>
                  <Tab
                    _selected={{
                      bgColor: '#F4F4F4',
                      color: '#09BC8A',
                    }}
                    fontWeight='500'
                    fontSize='16px'
                    color='#B9B9B9'
                    display='flex'
                    alignItems='center'
                    gap='10px'
                  >
                    Feature
                    {filterBrandByFlow.flows.length > 0 && (
                      <Flex
                        width='23px'
                        height='23px'
                        bgColor='#09BC8A'
                        justifyContent='center'
                        alignItems='center'
                        borderRadius='30px'
                        fontWeight='700'
                        fontSize='10px'
                        color='#FCFCFC'
                      >
                        {filterBrandByFlow.flows.length}
                      </Flex>
                    )}
                  </Tab>
                </TabList>
                <TabPanels mt='16px'>
                  <TabPanel
                    maxH='297px'
                    overflowY='scroll'
                    className='styled-scrollbar'
                  >
                    <Flex gap='10px' flexWrap='wrap'>
                      {listCategory.map((category, i) => (
                        <Button
                          key={i}
                          bgColor={
                            filterBrandByFlow.categories.includes(category.name)
                              ? '#07A377'
                              : '#EFEFEF'
                          }
                          borderRadius='8px'
                          padding='8px 12px'
                          fontWeight='400'
                          fontSize='12px'
                          color={
                            filterBrandByFlow.categories.includes(category.name)
                              ? '#FBFFFE'
                              : '#172A3A'
                          }
                          onClick={() => onClickCategory(category.name)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </Flex>
                  </TabPanel>
                  <TabPanel
                    maxH='297px'
                    overflowY='scroll'
                    className='styled-scrollbar'
                  >
                    <Flex gap='10px' flexWrap='wrap'>
                      {listFlow.map((flow, i) => (
                        <Button
                          key={i}
                          bgColor={
                            filterBrandByFlow.flows.includes(flow._id)
                              ? '#07A377'
                              : '#EFEFEF'
                          }
                          borderRadius='8px'
                          padding='8px 12px'
                          fontWeight='400'
                          fontSize='12px'
                          color={
                            filterBrandByFlow.flows.includes(flow._id)
                              ? '#FBFFFE'
                              : '#172A3A'
                          }
                          onClick={() => onClickModule(flow._id)}
                        >
                          {flow._id}
                        </Button>
                      ))}
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Button
                mt='32px'
                w='full'
                h='48px'
                color='white'
                bgColor='#09BC8A'
                borderRadius='12px'
                fontWeight='500'
                fontSize='20px'
              >
                Apply
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box mt='24px' mb='12px'>
          {/* if (filterPageView.brand) {
      return <ListBrand listBrand={listBrand} />;
    } else if (filterPageView.flow) {
      return (
        <ListBrandFlowView
          activeFlow={filterBrandByFlow.flows}
          listBrandByFlow={listBrandByFlow}
        />
      ); */}
          <Text
            fontWeight='600'
            fontSize='14px'
            lineHeight='21px'
            color='#172A3A'
            display={{ base: 'hide', md: 'initial' }}
          >
            Result :{' '}
            {filterPageView.brand ? listBrand.length : listBrandByFlow.length}{' '}
            Apps
          </Text>
        </Box>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          mt={{ base: '32px', md: 0 }}
          gap='52px'
        >
          <Box
            width='236px'
            display={{ base: 'none', md: 'initial' }}
            height='500px'
          >
            <FilterTools
              refSidebar={refSidebar}
              showFlowFilter={filterPageView.flow}
              listFlow={listFlow}
              listCategory={listCategory}
              onChangeFilterFlow={onChangeFilterFlow}
              onChangeFilterCategory={onChangeFilterCategory}
              filterBrandByFlow={filterBrandByFlow}
              FILTER_PRICE={FILTER_PRICE}
              onChangeFilterPrice={onChangeFilterPrice}
              showFilterPrice={false}
              showFilterModule={!filterPageView.flow}
            />
          </Box>
          <Box
            zIndex='1000'
            w='full'
            ml={{ base: 0, md: isFixedPositionSidebar ? '60px' : 0 }}
          >
            {renderBrand()}
            {listBrand.length > 0 && (
              <BrandReachBottom
                onSearchAgain={scrollOnTop}
                onRequest={onRequest}
              />
            )}
            <Center>
              <Footer />
            </Center>
          </Box>
        </Flex>
        <Center display={{ base: 'flex', md: 'none' }}>
          <Flex
            p='8px 16px'
            position='fixed'
            bottom='20px'
            gap='10px'
            alignItems='center'
            display={{ base: 'flex', md: 'none' }}
            zIndex='1000'
            bgColor='#09BC8A'
            boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
            borderRadius='8px'
          >
            <IconButton
              minW='24px'
              height='24px'
              aria-label='brands'
              onClick={() => onChangeFilterPageView('brand')}
              icon={
                <svg
                  width='11'
                  height='14'
                  viewBox='0 0 11 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1.3076 13.6682C1.18315 13.6682 1.07115 13.6247 0.971599 13.5376C0.872043 13.438 0.822266 13.3198 0.822266 13.1829V1.0869C0.822266 0.950007 0.872043 0.838007 0.971599 0.750896C1.07115 0.65134 1.18315 0.601562 1.3076 0.601562H4.40627C4.54315 0.601562 4.66138 0.65134 4.76093 0.750896C4.86049 0.838007 4.91027 0.950007 4.91027 1.0869V10.3456H10.3049C10.4418 10.3456 10.56 10.3953 10.6596 10.4949C10.7592 10.582 10.8089 10.694 10.8089 10.8309V13.1829C10.8089 13.3198 10.7592 13.438 10.6596 13.5376C10.56 13.6247 10.4418 13.6682 10.3049 13.6682H1.3076Z'
                    fill='#FBFFFE'
                  />
                </svg>

                // <BrandIcon
                //   showHover
                //   fill='#FBFFFE'
                //   // fill={filterPageView.brand ? '#004346' : '#FBFFFE'}
                //   onClick={() => onChangeFilterPageView('brand')}
                // />
              }
              bgColor={filterPageView.brand ? '#004346' : '#09BC8A'}
            />

            <Text fontWeight='500' fontSize='16px' color='#FBFFFE'>
              {filterPageView.brand ? 'Brands' : 'Flows'}
            </Text>
            <IconButton
              minW='24px'
              height='24px'
              aria-label='brands'
              onClick={() => onChangeFilterPageView('flow')}
              icon={
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21.018 13.4286C20.2467 13.4288 19.5058 13.7293 18.9524 14.2666L17.7755 13.6781C18.7362 10.5274 16.9609 7.19458 13.8102 6.23392C12.6577 5.88255 11.4258 5.88845 10.2768 6.25084L9.5869 5.00533C10.6942 3.79286 10.6089 1.91233 9.39645 0.805094C8.18398 -0.302187 6.3035 -0.216922 5.19622 0.995547C4.08894 2.20802 4.1742 4.0885 5.38667 5.19578C5.9367 5.69809 6.65525 5.97564 7.40009 5.97348C7.54306 5.96941 7.68556 5.95511 7.82651 5.93074L8.51037 7.16627C5.92011 9.08847 5.33881 12.7273 7.20125 15.3609L4.3047 18.1441C2.76805 17.4559 0.964483 18.1437 0.276311 19.6803C-0.411861 21.217 0.275936 23.0206 1.81259 23.7087C3.34925 24.3969 5.15281 23.7091 5.84098 22.1725C6.22442 21.3163 6.19231 20.3313 5.75398 19.5018L8.59287 16.7733C11.2456 18.6946 14.9534 18.1034 16.877 15.4523L18.0698 16.0487C18.0509 16.1684 18.0397 16.2893 18.036 16.4105C18.036 18.0574 19.3711 19.3925 21.018 19.3925C22.665 19.3925 24 18.0576 24 16.4107C24 14.7638 22.6649 13.4286 21.018 13.4286Z'
                    fill='#FBFFFE'
                  />
                </svg>

                // <BrandIcon
                //   showHover
                //   fill={filterPageView.brand ? '#004346' : '#B4C6D4'}
                //   onClick={() => onChangeFilterPageView('brand')}
                // />
              }
              bgColor={filterPageView.flow ? '#004346' : '#09BC8A'}
            />
          </Flex>
        </Center>
      </AppTemplate>
    </Layout>
  );
};

export default Explore;
