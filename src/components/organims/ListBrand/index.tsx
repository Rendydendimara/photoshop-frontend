import { Button } from '@chakra-ui/button';
import { Checkbox } from '@chakra-ui/checkbox';
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
import { BrandIcon } from 'components/atoms/icons/brand-icon';
import { CategoryIcon } from 'components/atoms/icons/category-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import { FlowIcon } from 'components/atoms/icons/flow-icon';
import BrandReachBottom from 'components/molecules/BrandReachBottom';
import FilterTools from 'components/molecules/FilterTools';
import TopbarFilter from 'components/molecules/FilterPageView';
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

interface IProps {
  listBrand: IBrand[];
}
const ListBrand: React.FC<IProps> = (props) => {
  const [dataBase, setDataBase] = useState<IBrand[]>([]);

  const renderItemBrand = (brands: IBrand[]) => {
    return <GridImage brands={brands} />;
  };

  useEffect(() => {
    let tempDataBase: any = [];
    let dataItem: any = [];
    let limit = 0;
    props.listBrand.map((brand) => {
      dataItem.push(brand);
      limit++;
      if (props.listBrand.length > 4) {
        if (limit === 4) {
          tempDataBase.push(dataItem);
          dataItem = [];
          limit = 0;
        }
      }
    });
    if (props.listBrand.length < 4) {
      tempDataBase.push(dataItem);
    }
    setDataBase(tempDataBase);
  }, [props.listBrand]);

  return (
    <Box>
      {dataBase.map((brandBase: any, i: any) => (
        <Box key={i}>
          {renderItemBrand(brandBase)}
          <Box mt={{ base: '10px', md: '60px' }} />
        </Box>
      ))}
    </Box>
  );
};

export default ListBrand;

interface IGridImage {
  brands: IBrand[];
}
const GridImage: React.FC<IGridImage> = (props) => {
  return (
    <Flex
      // padding={{ md: 4 }}
      w='full'
      // gap='48px'
      // column={[2, 3, 4]}
      // minChildWidth={{ base: '155px', md: '192px' }}
      gap={{ base: 3, md: '30px', xl: '44px' }}
      flexWrap='wrap'
      // justifyContent={{ base: 'center', md: 'center' }}
    >
      {props.brands.map((brand, i) => (
        <Link href={`/brand/${brand._id}`} key={i}>
          <Box
            mb={{ base: 2, md: 0 }}
            w={{ base: '155px', md: '192px' }}
            _hover={{ cursor: 'pointer' }}
          >
            <Flex
              justifyContent='center'
              alignItems='center'
              boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
              width='full'
              height='190px'
              borderRadius='8px'
            >
              <Image
                src={
                  brand.brandImage === undefined ||
                  brand.brandImage.length === 0
                    ? './images/shoope.png'
                    : brand.brandImage
                }
                alt='shoope logo'
                width={{ base: '144px', md: '144px' }}
                height='153px'
                objectFit='contain'
                objectPosition='center'
              />
            </Flex>
            <Box mt='12px' padding='8px'>
              <Text
                fontWeight='500'
                fontSize={{ base: '18px', md: '14px' }}
                // lineHeight='14px'
                textAlign='center'
                color='#172A3A'
              >
                {brand.brandName}
              </Text>
              <Text
                mt='4px'
                color='#B4C6D5'
                textAlign='center'
                fontWeight='400'
                fontSize='12px'
                lineHeight='14px'
              >
                {brand.modules} Module {brand.screens} Screen
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
    </Flex>
  );
};
