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
      width='900px'
      //  w='full'
      gap={{ base: 3, md: '30px' }}
      flexWrap='wrap'
    >
      {props.listBrandByFlow.map((brand, item) => (
        <Link
          href={`/brand/${
            brand._id
          }?showContent=true&flows=${props.activeFlow.join(',')}`}
          key={item}
        >
          <Box _hover={{ cursor: 'pointer' }}>
            {/* Brand Info */}
            <Flex alignItems='center' gap='20px'>
              <Flex
                justifyContent='center'
                alignItems='center'
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                width='120px'
                height='120px'
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
              <Flex flexDirection='column' gap='4px'>
                <Text
                  fontWeight='500'
                  fontSize='14px'
                  textAlign='left'
                  color='#172A3A'
                >
                  {brand.brandName}
                </Text>
                <Text
                  fontWeight='400'
                  fontSize='12px'
                  textAlign='left'
                  color='#B4C6D5'
                >
                  {brand.modules} Module {brand.screens} Screen
                </Text>
                <Text
                  fontWeight='400'
                  fontSize='11px'
                  textAlign='left'
                  color='black'
                >
                  Last updated {moment(brand.updated_at).format('DD MMM')}
                </Text>
              </Flex>
            </Flex>
            {/* Brand Image */}
            <Flex mt='24px' gap='28px'>
              {brand.images.slice(0, 2).map((image, i) => (
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
        </Link>
      ))}
    </Flex>
    // </Box>
  );
};

export default ListBrandFlowView;
