import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Center, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { ApiGetListBrand } from 'api/brand';
import BrandItemModal from 'components/molecules/BrandItemModal';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { LOCAL_COMPARE } from 'constant/local';
import { IBrand } from 'interfaces/IBrand';
import { getLocalCookie, setLocalCookie } from 'lib/Cookies/AppCookies';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';

const Compare: NextPage = () => {
  const router = useRouter();
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
  const [listBrandCompetitor, setListBrandCompetitor] = useState<IBrand[]>([]);
  // setLocal(LOCAL_COMPARE[1].brandId, brandId);
  // setLocal(LOCAL_COMPARE[1].listModule, listCheckedModule);
  // console.log(getLocalCookie(LOCAL_COMPARE[1].brandId));
  // console.log(getLocalCookie(LOCAL_COMPARE[1].listModule));

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
    category?: string;
    notIncludeBrandId?: string[];
    keyword?: string[];
  }) => {
    const res = await ApiGetListBrand(filter);
    if (res.status === 200) {
      setListBrandCompetitor(res.data.data);
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

  useEffect(() => {
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
    }
    handleGetListBrand({ notIncludeBrandId: temp });
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
            <Text fontWeight='600' lineHeight='24px' fontSize='20px'>
              Compare Competitor
            </Text>
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
                boxShadow='md'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
                flexDirection='column'
                onClick={() => handleOpenBrand('brand1')}
              >
                <AiOutlinePlus size='30' fill='#172A3A' />
                <Text
                  fontWeight='500'
                  fontSize='16px'
                  color='#172A3A'
                  lineHeight='19px'
                >
                  Add Competitor
                </Text>
              </Flex>
            )}
            {!listIdBrandCompareObject.brand2 && (
              <Flex
                boxShadow='md'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
                flexDirection='column'
                onClick={() => handleOpenBrand('brand2')}
              >
                <AiOutlinePlus size='30' fill='#172A3A' />
                <Text
                  fontWeight='500'
                  fontSize='16px'
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
                boxShadow='md'
                justifyContent='center'
                alignItems='center'
                minW='240px'
                minH='190px'
                flexDirection='column'
              >
                <AiOutlinePlus size='30' fill='#172A3A' />
                <Text
                  fontWeight='500'
                  fontSize='16px'
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
              leftIcon={<HiOutlinePlusSm />}
              color='#FBFFFE'
              fontWeight='600'
              variant='solid'
              w='full'
              bgColor='#09BC8A'
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
          size='3xl'
        >
          <ModalOverlay />
          <ModalContent p='0' maxH='90vh'>
            <ModalBody mt='15px' w='full' overflowY='scroll'>
              <Flex
                gap='10px'
                alignItems='center'
                mb='8'
                flexDirection='column'
              >
                <Text fontWeight='500' fontSize='16px' color='#172A3A'>
                  Search Competitor
                </Text>
                <Center>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<RiSearchLine color='#B4C6D5' />}
                    />
                    <Input
                      width='365px'
                      height='41px'
                      border='2px solid #172A3A !important'
                      borderRadius='8px'
                      placeholder='Ex Gojek, Cart, or Fashion'
                      _placeholder={{
                        fontWeight: 300,
                        fontSize: '14px',
                        color: '#B4C6D5',
                      }}
                    />
                  </InputGroup>
                </Center>
              </Flex>
              <SimpleGrid mt='17px' columns={[1, 3, 5]} spacing='12px'>
                {listBrandCompetitor.map((brand, i) => (
                  <Box
                    key={i}
                    boxShadow='md'
                    p='2'
                    _hover={{ cursor: 'pointer' }}
                    onClick={() => handleAddBrandCompare(brand._id, fieldAdd)}
                  >
                    <Image
                      src={
                        brand.brandImage === undefined ||
                        brand.brandImage.length === 0
                          ? './images/shoope.png'
                          : brand.brandImage
                      }
                      alt='shoope logo'
                      // width={{ base: 'full', md: '120px' }}
                      width={{ base: '144px', md: '144px' }}
                      height='153px'
                      objectFit='contain'
                      objectPosition='center'
                    />
                    <Text
                      fontWeight='700'
                      fontSize='14px'
                      lineHeight='24px'
                      textAlign='center'
                      mt='4'
                    >
                      {brand.brandName}
                    </Text>{' '}
                    <Text
                      fontWeight='500'
                      fontSize='12px'
                      // lineHeight='24px'
                      textAlign='center'
                      mt='4px'
                      color='#B4C6D4'
                    >
                      {brand?.modules} Module {brand?.screens} Screen
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </AppTemplate>
    </Layout>
  );
};

export default Compare;
