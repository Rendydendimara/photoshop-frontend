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

  const getListFlow = async () => {
    const res = await ApiGetListModules();
    if (res.status === 200) {
      setListFlow(res.data.data);
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

  const handleFilterCategory = (idCategory: string) => {
    setFilterBrand({
      ...filterBrand,
      selectedCategory: idCategory,
    });
    handleGetListBrand({ keyword: filterBrand.keyword, category: idCategory });
  };

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
      handleGetListBrand({ category: value });
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
    setFilterBrandByFlow({
      ...filterBrandByFlow,
      flows: newFlows,
    });
    getListBrandByFlow({
      ...filterBrandByFlow,
      flows: newFlows,
    });
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
    setFilterBrandByFlow({
      ...filterBrandByFlow,
      categories: newCategories,
    });
    getListBrandByFlow({
      ...filterBrandByFlow,
      categories: newCategories,
    });
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

  useEffect(() => {
    // Get the navbar
    let navbar: any;
    let sidebar: any;

    if (typeof window !== 'undefined') {
      navbar = document.getElementById('categoryDeskop');
      sidebar = document.getElementById('sidebarContainer');
    }

    // Get the offset position of the navbar
    let sticky: any = navbar?.offsetTop;
    let stickySidebar: any = sidebar?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      window.onscroll = function () {
        handleScroll();
        // checkMLSidebar();
        // console.log('useEffect isFixedPositionSidebar', isFixedPositionSidebar);
      };
    }

    function handleScroll() {
      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      if (window.pageYOffset >= sticky + 57) {
        navbar.classList.add('stickyNavbarHome');
        sidebar.classList.add('stickySidebar');
        // if (!isFixedPositionSidebar) {
        // setIsFixedPositionSidebar(true);
        // }
      } else {
        navbar.classList.remove('stickyNavbarHome');
        sidebar.classList.remove('stickySidebar');
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
    <Layout showNavbarFooter>
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
                onClickFilterV2={onClickFilterV2}
                filterBrandV2={filterBrandV2}
                resultSearchBrand={resultSearchBrand}
              />
            </Flex>
            {/* Category Mobile */}
            <Flex
              w='full'
              display={{ base: 'flex', md: 'none' }}
              justifyContent='space-between'
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
                variant='outline'
                bgColor='#ECECEC'
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
          <DrawerContent bgColor='transparent'>
            <DrawerBody
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px -4px 8px rgba(0, 0, 0, 0.06)'
              borderRadius='16px 16px 0px 0px'
              maxH='60vh'
              bgColor='white'
              p='32px 28px 32px 28px'
            >
              {listCategory.map((category, i) => (
                <CheckboxItem
                  key={i}
                  marginBtm={i + 1 === listCategory.length ? 0 : '24px'}
                  icon={
                    filterBrandByFlow.categories.includes(category._id) ? (
                      <CheckboxCheckedIcon />
                    ) : (
                      <CheckboxIcon />
                    )
                  }
                  value={category._id}
                  onChange={onChangeFilterCategory}
                  fontWeight={
                    filterBrandByFlow.categories.includes(category._id)
                      ? '600'
                      : '400'
                  }
                  name={category.name}
                  colorCount={
                    filterBrandByFlow.categories.includes(category._id)
                      ? '#172A3A'
                      : '#8FA2B1'
                  }
                  totalCount={category.totalBrand}
                />
              ))}

              <Button
                mt='32px'
                w='full'
                color='white'
                bgColor='#09BC8A'
                borderRadius='12px'
                fontWeight='500'
                fontSize='14px'
                lineHeight='17px'
              >
                Apply
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          mt='32px'
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
            />
          </Box>
          <Box zIndex='1000' w='full'>
            {renderBrand()}
            {listBrand.length > 0 && <BrandReachBottom />}
          </Box>
        </Flex>
      </AppTemplate>
    </Layout>
  );
};

export default Explore;
