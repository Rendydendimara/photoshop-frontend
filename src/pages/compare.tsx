import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { ApiFindBrand } from 'api/brand';
import { ApiGetListCategoryV2 } from 'api/category';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import BrandItemModal from 'components/molecules/BrandItemModal';
import FilterCheckbox from 'components/molecules/FilterCheckbox';
import CheckboxItem from 'components/molecules/FilterCheckbox/CheckboxItem';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { LOCAL_COMPARE } from 'constant/local';
import { IBrandV2 } from 'interfaces/IBrand';
import { ICategory } from 'interfaces/ICategory';
import { getLocalCookie, setLocalCookie } from 'lib/Cookies/AppCookies';
import { every, filter, includes, some } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiSearchLine } from 'react-icons/ri';
import { shimmer, toBase64 } from 'utils/imageOptimization';

let searchTimer: any;
const Compare: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listIdBrandCompare, setListIdBrandCompare] = useState<string[]>([]);
  const [listIdBrandCompareObject, setListIdBrandCompareObject] = useState<any>(
    {
      brand1: '',
      brand2: '',
      brand3: '',
    }
  );
  const [fieldAdd, setFieldAdd] = useState('');
  const [listBrandCompetitor, setListBrandCompetitor] = useState<IBrandV2[]>(
    []
  );
  const [listBrandCompetitorStatic, setListBrandCompetitorStatic] = useState<
    IBrandV2[]
  >([]);
  const [listCategory, setListCategory] = useState<ICategory[]>([]);
  const [filterBrand, setFilterBrand] = useState<{
    categories: string[];
  }>({
    categories: [],
  });

  const handleAddBrandCompare = (brandId: string, fieldName: string) => {
    setListIdBrandCompareObject({
      ...listIdBrandCompareObject,
      [fieldName]: brandId,
    });
    let temp = [...listIdBrandCompare, brandId];
    handleGetListBrand({ notIncludeBrandId: temp });
    setFieldAdd('');
    onClose();
  };

  const handleRemoveBrandCompare = (brandId: string, fieldName: string) => {
    let temp = listIdBrandCompare.filter((brand) => brand !== brandId);
    setListIdBrandCompareObject({
      ...listIdBrandCompareObject,
      [fieldName]: '',
    });
    setListIdBrandCompare(temp);
    handleGetListBrand({ notIncludeBrandId: temp });
  };

  const handleGetListBrand = async (filter: {
    category?: string[];
    notIncludeBrandId?: string[];
    keyword?: string[];
  }) => {
    const res = await ApiFindBrand(filter);
    if (res.status === 200) {
      setListBrandCompetitor(res.data.data);
      setListBrandCompetitorStatic(res.data.data);
    }
  };

  const handleOpenBrand = (fieldName: string) => {
    setFieldAdd(fieldName);
    onOpen();
  };

  const handleCompare = () => {
    router.push(
      `/explore-compare?brand1=${listIdBrandCompareObject.brand1}&brand2=${listIdBrandCompareObject.brand2}&brand3=${listIdBrandCompareObject.brand3}`
    );
  };

  const checkDisable = () => {
    let total = 0;
    if (listIdBrandCompareObject.brand1) {
      total += 1;
    }
    if (listIdBrandCompareObject.brand2) {
      total += 1;
    }
    if (listIdBrandCompareObject.brand3) {
      total += 1;
    }
    return {
      disable: total > 1,
      total: total,
    };
    // if(listIdBrandCompareObject)
  };

  const onChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearch(e.target.value);
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(searching, 500, e.target.value);
  };

  const searching = (query: string): void => {
    if (query != '') {
      const searchQuery = query.toLowerCase();
      const temp = filter(listBrandCompetitorStatic, (brand: IBrandV2) => {
        let passFilter: boolean[] = [];
        // SEARCH
        if ((searchQuery?.length ?? 0) > 0) {
          const haystack = [brand.name.toLowerCase()];
          passFilter.push(some(haystack, (el) => includes(el, searchQuery)));
        } else {
          passFilter.push(true);
        }
        // CATEGORIES filterBrand.categories
        // FINAL CHECKING
        if (passFilter.length > 0) {
          return every(passFilter, Boolean);
        } else {
          return true;
        }
      });
      setListBrandCompetitor(temp);
    } else {
      setListBrandCompetitor(listBrandCompetitorStatic);
    }
  };

  const filteredListBrand = () => {
    if (search.length === 0 && filterBrand.categories.length === 0) {
      return listBrandCompetitorStatic;
    } else {
      const tempBrand = filter(listBrandCompetitorStatic, (brand: IBrandV2) => {
        let passFilter: boolean[] = [];
        // let catBrand = brand.category.map((cat) => cat._id)
        // FILTER
        // if (
        //   filterBrand.categories.length > 0 &&
        //   filterBrand.categories.includes('all') === false
        // ) {
        //   passFilter.push(
        //     filterBrand.categories.includes(brand.category_id._id)
        //   );
        // } else {
        //   passFilter.push(true);
        // }

        // SEARCH
        if (search.length > 0) {
          const haystack = [brand.name.toLowerCase()];
          passFilter.push(some(haystack, (el) => includes(el, search)));
        } else {
          passFilter.push(true);
        }

        // FINAL CHECKING
        if (passFilter.length > 0) {
          return every(passFilter, Boolean);
        } else {
          return true;
        }
      });
      return tempBrand;
    }
  };

  const onChangeFilterCategory = (e: any) => {
    let newCategories: any[] = [];
    if (filterBrand.categories.includes(e.target.name)) {
      newCategories = filterBrand.categories.filter(
        (flow) => flow !== e.target.name
      );
    } else {
      newCategories = [...filterBrand.categories, e.target.name];
    }
    if (e.target.name === 'all' && newCategories.includes('all')) {
      setFilterBrand({
        ...filterBrand,
        categories: ['all'],
      });
    } else {
      if (newCategories.includes('all')) {
        newCategories = newCategories.filter((cat) => cat !== 'all');
      }
      setFilterBrand({
        ...filterBrand,
        categories: newCategories,
      });
    }
  };

  const handleGetListCategory = async () => {
    const res = await ApiGetListCategoryV2();
    if (res.status === 200) {
      let data = res.data.data;
      let dataResult: any = data;
      let countTotal = 0;
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
      setListCategory(dataResult);
    }
  };
  const renderBrandName = (name: string) => {
    let searchString = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // let paragraph = document.getElementById("paragraph");
    // textToSearch = search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

    let pattern = new RegExp(`${searchString}`, 'gi');
    return name.replace(pattern, (match) => `<b>${match}</b>`);
    // paragraph.innerHTML = paragraph.textContent.replace(pattern, match => `<mark>${match}</mark>`)
  };

  const onScorllModalBody = () => {
    // Get the navbar
    let navbar: any;
    let sidebar: any;
    let modalBody: any;

    if (typeof window !== 'undefined') {
      modalBody = document.getElementById('modalBody');
      navbar = document.getElementById('categoryDeskop');
      sidebar = document.getElementById('sidebarContainer');
    }

    // Get the offset position of the navbar
    let sticky: any = navbar?.offsetTop;
    let stickySidebar: any = sidebar?.offsetTop;
    // When the user scrolls the page, execute myFunction
    if (typeof window !== 'undefined') {
      // window.onscroll = function () {
      handleScroll();
      // };
    }

    function handleScroll() {
      // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      if (modalBody?.offsetHeight >= sticky) {
        navbar?.classList.add('stickyNavbarHome');
        sidebar?.classList.add('stickySidebar');
      } else {
        navbar?.classList.remove('stickyNavbarHome');
        sidebar?.classList.remove('stickySidebar');
      }
    }
  };

  useEffect(() => {
    handleGetListCategory();
    let brandIdLocal = getLocalCookie(LOCAL_COMPARE[1].brandId);
    let temp = [];
    if (brandIdLocal) {
      setListIdBrandCompareObject({
        brand1: brandIdLocal,
        brand2: '',
        brand3: '',
      });
      setListIdBrandCompare([brandIdLocal]);
      temp.push(brandIdLocal);
      setLocalCookie(LOCAL_COMPARE[1].brandId, false);
      setLocalCookie(LOCAL_COMPARE[1].listModule, false);
      handleGetListBrand({ notIncludeBrandId: temp });
    }
  }, []);

  return (
    <Layout showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Compare</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Flex
          // gap='40px'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          h='90vh'
        >
          <Box mb='44px'>
            <Heading as='h2' color='#172A3A' fontWeight='600' fontSize='48px'>
              Compare Competitor
            </Heading>
          </Box>
          <Flex alignItems='flex-start' gap='80px'>
            {/* {renderListBrandSelected()} */}
            {listIdBrandCompareObject.brand1 && (
              <BrandItemModal
                fieldName='brand1'
                brandId={listIdBrandCompareObject.brand1}
                onRemove={handleRemoveBrandCompare}
              />
            )}
            {listIdBrandCompareObject.brand2 && (
              <BrandItemModal
                fieldName='brand2'
                brandId={listIdBrandCompareObject.brand2}
                onRemove={handleRemoveBrandCompare}
              />
            )}
            {listIdBrandCompareObject.brand3 && (
              <BrandItemModal
                fieldName='brand3'
                brandId={listIdBrandCompareObject.brand3}
                onRemove={handleRemoveBrandCompare}
              />
            )}
            {!listIdBrandCompareObject.brand1 && (
              <Flex
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='12px'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
                flexDirection='column'
                onClick={() => handleOpenBrand('brand1')}
              >
                <AiOutlinePlus size='30' fill='#172A3A' />
                <Text
                  fontWeight='400'
                  fontSize='14px'
                  color='#172A3A'
                  lineHeight='19px'
                >
                  Add Competitor
                </Text>
              </Flex>
            )}
            {!listIdBrandCompareObject.brand2 && (
              <Flex
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='12px'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
                flexDirection='column'
                onClick={() => handleOpenBrand('brand2')}
              >
                <AiOutlinePlus size='30' fill='#172A3A' />
                <Text
                  fontWeight='400'
                  fontSize='14px'
                  color='#172A3A'
                  lineHeight='19px'
                >
                  Add Competitor
                </Text>
              </Flex>
            )}
            {!listIdBrandCompareObject.brand3 && (
              <Flex
                onClick={() => handleOpenBrand('brand3')}
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='12px'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
                flexDirection='column'
              >
                <AiOutlinePlus size='30' fill='#172A3A' />
                <Text
                  fontWeight='400'
                  fontSize='14px'
                  color='#172A3A'
                  lineHeight='19px'
                >
                  Add Competitor
                </Text>
              </Flex>
            )}
          </Flex>
          <Box mt='22px'>
            {/* <Link
              href={`/explore-compare?brand1=${listIdBrandCompareObject.brand1}&brand2=${listIdBrandCompareObject.brand2}&brand3=${listIdBrandCompareObject.brand3}`}
            > */}
            <Button
              disabled={!checkDisable().disable}
              color='#FBFFFE'
              fontWeight='600'
              variant='solid'
              w='full'
              bgColor='#09BC8A'
              minW='224px'
              _hover={{}}
              h='40px'
              onClick={handleCompare}
            >
              Compare
            </Button>
            {checkDisable().total === 1 && (
              <Text
                mt='10px'
                fontWeight='400'
                fontSize='12px'
                lineHeight='14px'
                color='#D36582'
              >
                Oops you can’t compare using one brand, add one more
              </Text>
            )}
            {/* </Link> */}
          </Box>
        </Flex>
        <Modal
          // closeOnOverlayClick={false}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size='5xl'
        >
          <ModalOverlay bgColor='rgba(23, 23, 23, 0.8)' />
          <ModalContent
            p='0'
            maxH='585px'
            w='864px'
            boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
            borderRadius='16px'
          >
            <ModalBody
              // onScroll={onScorllModalBody}
              p='40px'
              w='full'
              overflowY='scroll'
              className='styled-scrollbar'
              position='relative'
              id='modalBody'
            >
              <Text
                textAlign='center'
                fontWeight='600'
                fontSize='20px'
                color='#172A3A'
              >
                Search Competitor
              </Text>
              <Box mt='28px' w='full'>
                <InputGroup
                  id='categoryDeskop'
                  w='full'
                  border=' 0.5px solid #EBEBEB'
                  borderRadius='8px'
                  padding='16px 12px'
                  bgColor='#FAFAFA'
                  height='53px'
                  alignItems='center'
                >
                  <InputLeftElement
                    w='14px'
                    position='initial'
                    mr='8px'
                    pointerEvents='none'
                    children={<RiSearchLine color='#B4C6D5' />}
                  />
                  <Input
                    p='0'
                    w='full'
                    border='unset'
                    placeholder='Ex Gojek, Cart, or Fashion'
                    _placeholder={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#AEC2D2',
                    }}
                    _focus={{}}
                    _active={{}}
                    _hover={{}}
                    _focusVisible={{}}
                    value={search}
                    onChange={onChangeSearch}
                  />
                </InputGroup>
                <Flex gap='24px' mt='20px' alignItems='flex-start'>
                  <Box w='30%' id='sidebarContainer'>
                    <FilterCheckbox width='full' labelName='Categories'>
                      {listCategory.map((category, i) => (
                        <CheckboxItem
                          key={i}
                          marginBtm={i + 1 === listCategory.length ? 0 : '12px'}
                          icon={
                            filterBrand.categories.includes(category._id) ? (
                              <CheckboxCheckedIcon />
                            ) : (
                              <CheckboxIcon />
                            )
                          }
                          value={category._id}
                          onChange={onChangeFilterCategory}
                          fontWeight={
                            filterBrand.categories.includes(category._id)
                              ? '600'
                              : '400'
                          }
                          name={category.name}
                          colorCount={
                            filterBrand.categories.includes(category._id)
                              ? '#172A3A'
                              : '#8FA2B1'
                          }
                          totalCount={category.totalBrand}
                        />
                      ))}
                    </FilterCheckbox>
                  </Box>
                  <SimpleGrid w='70%' columns={[1, 3, 4]} spacing='12px'>
                    {filteredListBrand().map((brand, i) => (
                      <Box
                        mt={i + 1 > 4 ? '24px' : 0}
                        key={i}
                        // boxShadow='md'
                        _hover={{ cursor: 'pointer' }}
                        onClick={() =>
                          handleAddBrandCompare(brand._id, fieldAdd)
                        }
                        w='full'
                      >
                        <Center
                          border='1px solid #EFEFEF'
                          borderRadius='8px'
                          px='10px'
                        >
                          <Image
                            src={
                              brand.logoSmall === undefined ||
                              brand.logoSmall.length === 0
                                ? '/images/shoope.png'
                                : brand.logoSmall
                            }
                            alt='shoope logo'
                            // width={{ base: 'full', md: '120px' }}
                            width={120}
                            height={120}
                            objectFit='contain'
                            objectPosition='center'
                            placeholder='blur'
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              shimmer(700, 700)
                            )}`}
                          />
                        </Center>
                        <Text
                          fontWeight='500'
                          fontSize='14px'
                          color='#172A3A'
                          textAlign='center'
                          mt='12px'
                          dangerouslySetInnerHTML={{
                            __html: renderBrandName(brand?.name ?? ''),
                          }}
                        />
                        <HStack spacing={2} justifyContent='center'>
                          {brand?.category.map((category, i) => (
                            <Text
                              fontWeight='400'
                              fontSize='12px'
                              // lineHeight='24px'
                              textAlign='center'
                              mt='4px'
                              color='#91A5B6'
                            >
                              {category.name}
                            </Text>
                          ))}
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </AppTemplate>
    </Layout>
  );
};

export default Compare;
