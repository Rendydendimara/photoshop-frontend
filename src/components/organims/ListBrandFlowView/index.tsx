import { Image } from '@chakra-ui/image';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { IBrand, IListBrandByFlow } from 'interfaces/IBrand';
import moment from 'moment';
// import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface IProps {
  listBrandByFlow: IListBrandByFlow[];
  activeFlow: string[];
}
const ListBrandFlowView: React.FC<IProps> = (props) => {
  const [dataBase, setDataBase] = useState<IBrand[]>([]);

  return (
    // <Box>
    <Flex
      width={{ base: 'full', md: '900px' }}
      //  w='full'
      gap={{ base: 3, md: '30px' }}
      flexWrap='wrap'
    >
      {props.listBrandByFlow.map((brand, item) => (
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
                    brand.brandImage === undefined ||
                    brand.brandImage.length === 0
                      ? './images/shoope.png'
                      : brand.brandImage
                  }
                  alt='shoope logo'
                  width='full'
                  // height='153px'
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
                    {brand.brandName}
                  </Text>
                  <Text
                    mt='4px'
                    fontWeight='400'
                    fontSize='12px'
                    textAlign='left'
                    color='#97A5B0'
                    display={{ base: 'none', md: 'block' }}
                  >
                    {brand.category_id.name}
                    {/* {brand.modules} Module {brand.screens} Screen */}
                  </Text>
                  <Text
                    mt='4px'
                    fontWeight='400'
                    fontSize='12px'
                    textAlign='left'
                    color='#91A5B6'
                    display={{ base: 'initial', md: 'none' }}
                  >
                    Have 3 Screen for Register
                  </Text>
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
                      {/* brand.description ?? */}
                      {
                        "Digitalisation of animal and plant markets by the nation's children to provide a place for the community of flora and fauna lovers and new players in fauna & flora."
                      }

                      {/* Last updated {moment(brand.updated_at).format('DD MMM')} */}
                    </Text>
                  </Box>
                </Box>
                <Box display={{ base: 'none', md: 'initial' }}>
                  <Text fontWeight='600' fontSize='12px' color='#07A377'>
                    {brand.screens} Screen
                  </Text>
                  <Text fontWeight='400' fontSize='11px' mt='4px' color='black'>
                    Last updated{' '}
                    {brand.updated_at
                      ? moment(brand.updated_at).format('DD MMM')
                      : moment(brand.created_at).format('DD MMM')}
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
              <Image
                src={image.imagePath}
                width={{ base: '144px', md: '200px' }}
                height='354px'
                objectFit='contain'
                objectPosition='center'
              />
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
    // </Box>
  );
};

export default ListBrandFlowView;
