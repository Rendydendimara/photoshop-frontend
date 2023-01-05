import { Button, IconButton } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/image';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ApiGetDetailBrand } from 'api/brand';
import {
  ApiGetListImageByBrandId,
  ApiGetListSameModuleByBrandsId,
} from 'api/images';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import { ListIcon } from 'components/atoms/icons/list-icon';
import { RemoveIcon } from 'components/atoms/icons/remove-icon';
import AppTemplate from 'components/templates/AppTemplate';
import Layout from 'components/templates/Layout';
import { APP_NAME } from 'constant';
import { IBrand } from 'interfaces/IBrand';
import { IImage } from 'interfaces/Image';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useHover, useOnClickOutside } from 'usehooks-ts';

const DUMMY_MODULE = [
  {
    name: 'E Commerce',
  },
  {
    name: 'Video Streaming',
  },
  {
    name: 'Travel Agent',
  },
  {
    name: 'Task Management',
  },
  {
    name: 'Food Apps',
  },
];

const Explore: NextPage = () => {
  const height = ['529px', '600px', '350px', '500px', '429px', '400px'];
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const router = useRouter();
  const [listSameModule, setListSameModule] = useState<string[]>([]);
  const [openFilterModule, setOpenFilterModule] = useState(false);
  const [listIdBrandCompare, setListIdBrandCompare] = useState<IBrand[]>([]);
  const [imagesBrand, setImagesBrand] = useState<
    {
      brandId: string;
      images: IImage[];
    }[]
  >([]);
  const [imagesBrandStatic, setImagesBrandStatic] = useState<
    {
      brandId: string;
      images: IImage[];
    }[]
  >([]);
  const refButtonFilter = useRef(null);
  const [filterModule, setFilterModule] = useState<string[]>([]);

  const handleClickOutside = () => {
    setOpenFilterModule(false);
  };

  const handleClickInside = () => {
    if (openFilterModule) {
      handleClickOutside();
    } else {
      setOpenFilterModule(true);
    }
  };

  const onChangeFilterModule = (e: any) => {
    let newFilter: any[] = [];
    if (filterModule.includes(e.target.name)) {
      newFilter = filterModule.filter((flow) => flow !== e.target.name);
    } else {
      newFilter = [...filterModule, e.target.name];
    }
    setFilterModule(newFilter);
    if (newFilter.length > 0) {
      let result: any[] = [];
      imagesBrandStatic.forEach((brand) => {
        let imgs = brand.images.filter((image: IImage) =>
          newFilter.includes(image.folder)
        );
        result.push({
          ...brand,
          images: imgs,
        });
      });
      setImagesBrand(result);
    } else {
      setImagesBrand(imagesBrandStatic);
    }
  };

  const getListSameModule = async (brandsId: string[]) => {
    const res = await ApiGetListSameModuleByBrandsId(brandsId);
    if (res.status === 200) {
      setListSameModule(res.data.data);
    }
  };

  useOnClickOutside(refButtonFilter, handleClickOutside);

  const getImageBrand = async (listBrandId: string[]) => {
    let temp: any[] = [];
    for (const brandId of listBrandId) {
      const res = await ApiGetListImageByBrandId({ brandId });
      if (res.status === 200) {
        temp.push({
          brandId,
          images: res.data.data,
        });
      }
    }
    setImagesBrandStatic(temp);
    if (filterModule.length > 0) {
      let result: any[] = [];
      temp.forEach((brand) => {
        let imgs = brand.images.filter((image: IImage) =>
          filterModule.includes(image.folder)
        );
        result.push({
          ...brand,
          images: imgs,
        });
      });
      setImagesBrand(result);
    } else {
      setImagesBrand(temp);
    }

    // let images: any[] = [];
    // temp.forEach((brand) => {
    //   let imgs = brand.images.filter((image: IImage) =>
    //     filterModule.includes(image.folder)
    //   );
    //   images.push(imgs);
    // });
    // temp = temp.map((tmp) => {
    //   return {
    //     ...tmp,
    //     images: images,
    //   };
    // });
  };

  const getDetailBrand = async (listBrandId: string[]) => {
    let temp: any[] = [];
    for (const brandId of listBrandId) {
      const res = await ApiGetDetailBrand(brandId);
      if (res.status === 200) {
        temp.push(res.data.data);
      }
    }
    setListIdBrandCompare(temp);
  };

  const handleRemoveBrand = (id: string) => {
    const newBrand = listIdBrandCompare.filter((brand) => brand._id !== id);
    const newBrandId = newBrand.map((brand) => brand._id);
    setListIdBrandCompare(newBrand);
    getImageBrand(newBrandId);
    getListSameModule(newBrandId);
  };

  useEffect(() => {
    const { brand1, brand2, brand3 }: any = router.query;
    let temp: string[] = [];
    if (brand1) {
      temp.push(brand1);
    }
    if (brand2) {
      temp.push(brand2);
    }
    if (brand3) {
      temp.push(brand3);
    }
    getDetailBrand(temp);
    getImageBrand(temp);
    getListSameModule(temp);
  }, [router.query]);

  return (
    <Layout disableMaxWidth showNavbarFooter>
      <Head>
        <title>{APP_NAME} | Explore</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate
        px={{
          sm: '0',
          md: '0',
          xl: '0',
        }}
      >
        <Box
          px={{
            base: '15px',
            md: '20px',
            xl: '30px',
          }}
          w='full'
          py='4'
          // maxH='95vh'
        >
          <Modal onClose={onClose} isOpen={true} isCentered size='6xl'>
            <ModalOverlay bg='rgba(9, 9, 9, 0.8)' zIndex='1000' />
            <ModalContent
              margin='0'
              padding='0'
              bgColor='transparent'
              border='unset'
              // maxH='0vh'
              w='full'
              zIndex='1000'
              maxW='90%'
              boxShadow='unset'
              // overflow='scroll'
              // className='styled-scrollbar'
            >
              <ModalBody w='full' border='unset'>
                <Flex
                  overflowX='scroll'
                  className='hide-styled-scrollbar'
                  maxH='100vh'
                  padding={4}
                  w='full'
                  flexDirection={{ base: 'column', md: 'row' }}
                  gap='24px'
                  justifyContent='center'
                  // alignItems='center'
                >
                  {imagesBrand.map((brand, i) => (
                    <Box
                      key={i}
                      maxH='100vh' //{{ base: 'unset', md: '100vh' }}
                      overflowY={{ base: 'unset', md: 'scroll' }}
                      className='hide-styled-scrollbar'
                    >
                      {brand.images.map((image, index) => (
                        <Image
                          alt={image.filename}
                          src={image.imagePath}
                          _hover={{ cursor: 'pointer' }}
                          key={index}
                          w={{
                            base: '270px',
                            md: '360px',
                            lg: '360px',
                            xl: '360px',
                          }}
                          mb='30px'
                          bgColor='#FF9797'
                        />
                      ))}
                    </Box>
                  ))}
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
        {/* Tools */}
        <Flex
          justifyContent='space-between'
          position='fixed'
          bottom='0'
          w='full'
          bg='linear-gradient(0deg, #000000 6.14%, rgba(0, 0, 0, 0) 75.09%)'
          height={{ base: '50px', md: '150px', lg: '200px', xl: '285px' }}
          zIndex='10000'
          px={{ md: '100px', lg: '140px', xl: '180px' }}
          alignItems='flex-end'
          pb='30px'
        >
          <Box>
            {openFilterModule && (
              <Box
                padding='28px'
                background='rgba(0, 0, 0, 0.9)'
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='8px'
                mb='16px'
              >
                <Text fontWeight='500' fontSize='16px' color='#EEF4F9'>
                  Same Module
                </Text>
                <Box mt='28px'>
                  {listSameModule.length > 0 ? (
                    listSameModule.map((module, i) => (
                      <RenderItemCheckbox
                        fontWeight={
                          filterModule.includes(module) ? '600' : '400'
                        }
                        filterModule={filterModule}
                        onChange={onChangeFilterModule}
                        key={i}
                        value={module}
                        name={module}
                        marginBtm={i + 1 === listSameModule.length ? 0 : '20px'}
                      />
                    ))
                  ) : (
                    <Text textAlign='center' color='white' fontSize='20px'>
                      -
                    </Text>
                  )}
                </Box>
              </Box>
            )}
            <Button
              leftIcon={<ListIcon />}
              fontWeight='500'
              color='white'
              fontSize='14px'
              bgColor='rgba(0, 0, 0, 0.66)'
              borderRadius='8px'
              variant='solid'
              ref={refButtonFilter}
              onClick={handleClickInside}
            >
              Select Module
            </Button>
          </Box>
          <Flex alignItems='center' gap='12px'>
            {listIdBrandCompare.map((brand, item) => (
              <Box position='relative' key={item}>
                <Flex
                  alignItems='center'
                  justifyContent='center'
                  p='4px'
                  bgColor='white'
                  width='63px'
                  borderRadius='100%'
                  height='63px'
                >
                  <Image
                    src={
                      brand?.brandImage === undefined ||
                      brand?.brandImage.length === 0
                        ? '/images/shoope.png'
                        : brand.brandImage
                    }
                  />
                </Flex>
                <IconButton
                  top='8px'
                  right='-12px'
                  onClick={() => handleRemoveBrand(brand._id)}
                  w='16px'
                  h='16px'
                  padding='0'
                  position='absolute'
                  aria-label='remove'
                  bgColor='unset !important'
                  icon={<RemoveIcon />}
                />
              </Box>
            ))}
          </Flex>
        </Flex>
      </AppTemplate>
    </Layout>
  );
};
interface IRenderItemCheckbox {
  marginBtm: any;
  value: any;
  onChange: (e: any) => void;
  fontWeight: any;
  name: any;
  filterModule: any[];
}
const RenderItemCheckbox: React.FC<IRenderItemCheckbox> = (props) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <Flex
      justifyContent='space-between'
      mb={props.marginBtm}
      alignItems='center'
      ref={hoverRef}
    >
      <Checkbox
        colorScheme=''
        icon={
          props.filterModule.includes(props.value) ? (
            <svg
              width='20'
              height='21'
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_486_2390)'>
                <path
                  d='M15.8333 0.5H4.16668C1.86664 0.502773 0.00277344 2.36664 0 4.66668V16.3334C0.00277344 18.6334 1.86664 20.4973 4.16668 20.5H15.8334C18.1334 20.4973 19.9973 18.6334 20 16.3333V4.66668C19.9973 2.36664 18.1334 0.502773 15.8333 0.5ZM16.6667 7.2325L8.955 14.9442C8.30426 15.5952 7.24898 15.5954 6.59797 14.9446C6.59781 14.9445 6.59766 14.9443 6.5975 14.9442L3.33332 11.6809C3.00723 11.3548 3.00723 10.8261 3.33332 10.5C3.65941 10.174 4.18809 10.1739 4.51414 10.5L7.77746 13.7634L15.49 6.05168C15.8161 5.72676 16.3438 5.72769 16.6687 6.05375C16.9937 6.37984 16.9927 6.90758 16.6667 7.2325Z'
                  fill='#EEF4F9'
                />
              </g>
              <defs>
                <clipPath id='clip0_486_2390'>
                  <rect
                    width='20'
                    height='20'
                    fill='white'
                    transform='translate(0 0.5)'
                  />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              width='20'
              height='21'
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_486_4361)'>
                <path
                  d='M15.4167 0.5H4.58333C3.36816 0.501323 2.20314 0.984634 1.34389 1.84389C0.484634 2.70314 0.00132347 3.86816 0 5.08333L0 15.9167C0.00132347 17.1318 0.484634 18.2969 1.34389 19.1561C2.20314 20.0154 3.36816 20.4987 4.58333 20.5H15.4167C16.6318 20.4987 17.7969 20.0154 18.6561 19.1561C19.5154 18.2969 19.9987 17.1318 20 15.9167V5.08333C19.9987 3.86816 19.5154 2.70314 18.6561 1.84389C17.7969 0.984634 16.6318 0.501323 15.4167 0.5V0.5ZM17.5 15.9167C17.5 16.4692 17.2805 16.9991 16.8898 17.3898C16.4991 17.7805 15.9692 18 15.4167 18H4.58333C4.0308 18 3.5009 17.7805 3.11019 17.3898C2.71949 16.9991 2.5 16.4692 2.5 15.9167V5.08333C2.5 4.5308 2.71949 4.0009 3.11019 3.61019C3.5009 3.21949 4.0308 3 4.58333 3H15.4167C15.9692 3 16.4991 3.21949 16.8898 3.61019C17.2805 4.0009 17.5 4.5308 17.5 5.08333V15.9167Z'
                  fill={isHover ? '#EEF4F9' : '#172A3A'}
                />
              </g>
              <defs>
                <clipPath id='clip0_486_4361'>
                  <rect
                    width='20'
                    height='20'
                    fill='white'
                    transform='translate(0 0.5)'
                  />
                </clipPath>
              </defs>
            </svg>
          )
        }
        // border='none'
        name={props.value}
        onChange={props.onChange}
        border='none !important'
      >
        <Text
          fontWeight={props.fontWeight}
          fontSize='14px'
          lineHeight='150%'
          color='#EEF4F9'
          as='span'
          ml='4px'
          textTransform='capitalize'
          _hover={{ color: '#09BC8A' }}
        >
          {props.name}
        </Text>
      </Checkbox>
    </Flex>
  );
};

export default Explore;
