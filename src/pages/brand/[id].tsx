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

const BrandIndex: NextPage = () => {
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
  }) => {
    const res = await ApiGetListImageByBrandId(filter);
    if (res.status === 200) {
      const data = groupBy(res.data.data, 'folder');
      let temp: {
        moduleName: string;
        images: IImage[];
      }[] = [];
      for (const module in data) {
        temp.push({
          moduleName: module,
          images: data[module],
        });
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

  useEffect(() => {
    const { id }: any = router.query;
    if (id) {
      setBrandId(id);
      getDetailBrand(id);
      getListModuleBrand(id);
      getImageBrand({ brandId: id });
    }
  }, [router.query]);

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
        <Box ml={{ base: '15px', md: '40px', xl: '80px' }}>
          <Link href='/explore'>
            <IconButton
              variant='unstyled'
              colorScheme='whatsapp'
              aria-label='back'
              icon={<FiArrowLeftCircle />}
            />
          </Link>
          <Flex pt='70px' pb='50px' w='full' alignItems='flex-start'>
            <Box
              px={{ base: '15px', md: '40px', lg: '80px' }}
              w={{ base: '100%', lg: '25%' }}
            >
              <Box>
                {/* Profile */}
                <Box>
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
                      width='174px'
                      height='56px'
                      objectFit='contain'
                      objectPosition='center'
                    />
                  </Flex>
                  <Box mt='18px' padding='8px'>
                    <Text
                      fontWeight='700'
                      fontSize='20px'
                      lineHeight='24px'
                      textAlign='left'
                    >
                      {brand?.brandName}
                    </Text>
                    <Text
                      mt='4px'
                      textAlign='left'
                      fontWeight='400'
                      fontSize='16px'
                      lineHeight='19px'
                    >
                      Last updated{' '}
                      {brand?.updated_at
                        ? moment(brand.updated_at).format('DD MMM')
                        : moment(brand?.created_at).format('DD MMM')}
                    </Text>
                    <Text
                      mt='12px'
                      textAlign='left'
                      fontWeight='400'
                      fontSize='14px'
                      lineHeight='150%'
                      color='#666666'
                    >
                      {brand?.description}
                    </Text>
                    {brand && brand.tags.length > 0 && (
                      <HStack spacing={2} mt='12px'>
                        {brand.tags.map((tag, i) => (
                          <Text
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
                {/* Modules */}
                <Box mt='30px'>
                  <Text fontWeight='700' fontSize='24px' color='#09BC8A'>
                    Modules
                  </Text>
                  <Box
                    padding='32px 24px'
                    background='#FBFBFB'
                    boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                    display='flex'
                    flexDirection='column'
                    gap='20px'
                  >
                    {moduleBrand.map((module, i) => (
                      <Checkbox
                        name={module._id}
                        onChange={handleChangeModuleCheckbox}
                        key={i}
                      >
                        {module._id}
                      </Checkbox>
                    ))}
                  </Box>
                </Box>
                {/* Button Compare */}
                <Box mt='30px'>
                  {/* <Link href='/compare'> */}
                  <Button
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
                  {/* </Link> */}
                </Box>
              </Box>
            </Box>
            <Box w={{ base: '100%', lg: '75%' }}>
              {filterBrandImages().map((imgBrand, i) => (
                <Box key={i}>
                  <ListImage
                    moduleName={imgBrand.moduleName}
                    images={imgBrand.images}
                    onClickImage={onOpenImage}
                  />
                  <Box mt={{ base: '30px', md: '50px', lg: '96px' }} />
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
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
              <Flex mt='24px' gap='48px' w='full' h='100%'>
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
      <Text fontWeight='700' fontSize='20px' lineHeight='24px'>
        {props.moduleName}
      </Text>
      <Flex
        mt='24px'
        gap='48px'
        alignItems='center'
        maxW='full'
        overflowX='scroll'
        className='styled-scrollbar'
        p='3'
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