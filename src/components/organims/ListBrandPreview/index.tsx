// import { Image } from '@chakra-ui/react';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/react';
import { IBrand, IBrandV2 } from 'interfaces/IBrand';
import moment from 'moment';
import NextImage from 'next/image';
// import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Image = chakra(NextImage, {
  baseStyle: { maxH: 354, maxW: 200 },
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader ',
    ].includes(prop),
});
interface IProps {
  listBrand: IBrandV2[];
  activeFlow: string[];
}
const ListBrandPreview: React.FC<IProps> = (props) => {
  const [dataBase, setDataBase] = useState<IBrand[]>([]);

  return (
    // <Box>
    <Flex
      width={{ base: 'full', md: '900px' }}
      //  w='full'
      gap={{ base: 3, md: '30px' }}
      flexWrap='wrap'
    >
      {props.listBrand.map((brand, item) => (
        <Box
          mt={item + 1 > 1 ? '52px' : 0}
          w='full'
          _hover={{ cursor: 'pointer' }}
          key={item}
        >
          {/* Brand Info */}
          <Link
            href={`/brand/${
              brand._id
            }?showContent=true&flows=${props.activeFlow.join(',')}`}
          >
            <Flex w='full' alignItems='flex-start' gap='12px'>
              <Flex
                justifyContent='center'
                alignItems='center'
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                width={{ base: '87px', md: '140px' }}
                height={{ base: '62px', md: '100px' }}
                borderRadius='12px'
                px='10px'
              >
                <Image
                  src={
                    // './images/shoope.png'
                    brand.logoSmall === undefined ||
                    brand.logoSmall.length === 0
                      ? './images/shoope.png'
                      : brand.logoSmall
                  }
                  alt='shoope logo'
                  width={140}
                  // layout='responsive'
                  height={153}
                  // width='140'
                  objectFit='contain'
                  objectPosition='center'
                />
              </Flex>
              <Flex
                w='full'
                justifyContent='space-between'
                alignItems='flex-start'
              >
                <Box maxW='568px'>
                  <Text
                    fontWeight={{ base: '500', md: '700' }}
                    fontSize={{ base: '14px', md: '16px' }}
                    textAlign='left'
                    color='#172A3A'
                  >
                    {brand.name}
                  </Text>
                  <HStack my='1'>
                    {brand.category.map((category, index3) => (
                      <Text
                        mt='4px'
                        fontWeight='400'
                        fontSize='12px'
                        textAlign='left'
                        color='#97A5B0'
                        display={{ base: 'none', md: 'block' }}
                      >
                        {category.name}
                      </Text>
                    ))}
                  </HStack>
                  {/* <Text
                    mt='4px'
                    fontWeight='400'
                    fontSize='12px'
                    textAlign='left'
                    color='#91A5B6'
                    display={{ base: 'initial', md: 'none' }}
                  >
                    Have 3 Screen for Register
                  </Text> */}
                  <Box
                    display={{ base: 'none', md: 'block' }}
                    mt='8px'
                    p='8px 12px'
                    bgColor='#EEF4F9'
                    borderRadius='8px'
                  >
                    <Text
                      fontWeight='400'
                      fontSize='12px'
                      textAlign='left'
                      color='#172A3A'
                    >
                      {brand.description}
                    </Text>
                  </Box>
                </Box>
                <Box display={{ base: 'none', md: 'initial' }}>
                  <Text fontWeight='600' fontSize='12px' color='#07A377'>
                    {brand.screenTotal} Screen
                  </Text>
                  <Text fontWeight='400' fontSize='11px' mt='4px' color='black'>
                    Last updated{' '}
                    {brand.updatedAt
                      ? moment(brand.updatedAt).format('DD MMM')
                      : moment(brand.createdAt).format('DD MMM')}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Link>
          {/* Brand Image */}
          <Flex
            maxW='full'
            overflowX='scroll'
            className='styled-scrollbar'
            mt={{ base: '10px', md: '24px' }}
            gap='28px'
          >
            {brand.images.map((image, i) => (
              // <Box width='200px' height='354px'>
              <Image
                src={image}
                alt='shoope logo'
                layout='responsive'
                width={200}
                height={354}
                // width={{ base: '144px', md: '200px' }}
                // height='354px'
                objectFit='contain'
                // objectPosition='center'
              />
              // </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
    // </Box>
  );
};

export default ListBrandPreview;
