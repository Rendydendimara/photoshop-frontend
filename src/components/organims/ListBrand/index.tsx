import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/react';
import { IBrandV2 } from 'interfaces/IBrand';
import Image from 'next/image';
// import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useHover } from 'usehooks-ts';
import { shimmer, toBase64 } from 'utils/imageOptimization';

interface IProps {
  listBrand: IBrandV2[];
}
const LIMIT_ROW_BRAND = 5;
const ListBrand: React.FC<IProps> = (props) => {
  const [dataBase, setDataBase] = useState<IBrandV2[]>([]);

  // const renderItemBrand = (brands: IBrand[]) => {
  //   return <GridImage brands={brands} />;
  // };

  useEffect(() => {
    // let tempDataBase: any = [];
    // let dataItem: any = [];
    // let limit = 0;
    // props.listBrand.map((brand) => {
    //   dataItem.push(brand);
    //   limit++;
    //   if (props.listBrand.length > LIMIT_ROW_BRAND) {
    //     if (limit === LIMIT_ROW_BRAND) {
    //       tempDataBase.push(dataItem);
    //       dataItem = [];
    //       limit = 0;
    //     }
    //   }
    // });
    // if (props.listBrand.length < LIMIT_ROW_BRAND) {
    //   tempDataBase.push(dataItem);
    // }
    // console.log('tempDataBase', tempDataBase);
    setDataBase(props.listBrand ?? []);
  }, [props.listBrand]);

  return (
    <Box w='full'>
      {/* {dataBase.map((brand: IBrand, i: any) => (
        <Box key={i}> */}
      <GridImage brands={dataBase} />
      {/* {renderItemBrand(brandBase)}
          <Box mt={{ base: '10px', md: '60px' }} />
        </Box> */}
      {/* ))} */}
    </Box>
  );
};

export default ListBrand;

interface IGridImage {
  brands: IBrandV2[];
}
const GridImage: React.FC<IGridImage> = (props) => {
  return (
    <SimpleGrid
      // padding={{ md: 4 }}
      w='full'
      columns={{ sm: 2, md: 4, xl: 5 }}
      // columns={5}
      // gap='48px'
      // minChildWidth={{ base: '156px' }}
      gap={{ base: '16px', md: '30px', xl: '49px' }}
      // flexWrap='wrap'
      // justifyContent={{ base: 'center', md: 'initial' }}
    >
      {props.brands.map((brand, i) => (
        <BrandItem key={i} brand={brand} />
      ))}
    </SimpleGrid>
  );
};

interface BrandItem {
  brand: IBrandV2;
}

const BrandItem: React.FC<BrandItem> = (props) => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  return (
    <Box
      w={{ base: 'full', md: '140px' }}
      mb={{ base: '10px', md: '2px', xl: '-17px' }}
      // mx={{ base: '16px', md: '30px', '2xl': '49px' }}
    >
      <Link href={`/brand/${props.brand._id}`}>
        <Box
          mb={{ base: 2, md: 0 }}
          _hover={{ cursor: 'pointer' }}
          ref={hoverRef}
        >
          <Flex
            justifyContent='center'
            alignItems='center'
            height='153px'
            borderRadius='12px'
            border={isHover ? '1px solid #E8E8E8' : '1px solid #EFEFEF'}
            bgColor='#FBFBFB'
            boxShadow={
              isHover
                ? '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                : 'unset'
            }
          >
            <Image
              src={
                props.brand.logoSmall === undefined ||
                props.brand.logoSmall.length === 0
                  ? './images/shoope.png'
                  : props.brand.logoSmall
              }
              alt='shoope logo'
              width={144}
              height={115}
              objectFit='contain'
              objectPosition='center'
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 700)
              )}`}
            />
          </Flex>
          <Box mt='8px'>
            <Text
              fontWeight='600'
              fontSize={{ base: '14px', md: '14px' }}
              // lineHeight='14px'
              textAlign='center'
              color={isHover ? '#09BC8A' : '#172A3A'}
            >
              {props.brand.name}
            </Text>
            <HStack spacing={2} justifyContent='center'>
              {props.brand.category.map((category, i) => (
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
        </Box>
      </Link>
    </Box>
  );
};
