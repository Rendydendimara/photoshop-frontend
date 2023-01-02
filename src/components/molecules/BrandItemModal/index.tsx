import { Button } from '@chakra-ui/button';
import { Image as ChakraImage } from '@chakra-ui/image';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { ApiGetDetailBrand } from 'api/brand';
import { IBrand } from 'interfaces/IBrand';
import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';

interface IBrandSelected {
  fieldName: string;
  brandId: string;
  onRemove: (brandId: string, fieldName: string) => void;
}
const BrandItemModal: React.FC<IBrandSelected> = (props) => {
  const [brand, setBrand] = useState<IBrand>();
  const getDetailBrand = async () => {
    const res = await ApiGetDetailBrand(props.brandId);
    if (res.status === 200) {
      setBrand(res.data.data);
    }
  };

  const handleRemove = () => {
    props.onRemove(brand?._id ?? '', props.fieldName);
  };

  useEffect(() => {
    getDetailBrand();
  }, []);
  return (
    <Box>
      <Flex
        // filter='drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04)) drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08))'
        justifyContent='center'
        alignItems='center'
        minW='240px'
        minH='190px'
        boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
        borderRadius='12px'
      >
        <ChakraImage
          alt='shoope'
          src={
            brand?.brandImage === undefined || brand?.brandImage.length === 0
              ? './images/shoope.png'
              : brand.brandImage
          }
          width={{ base: '144px', md: '144px' }}
          height='153px'
          objectFit='contain'
          objectPosition='center'
        />{' '}
      </Flex>
      <Text
        fontWeight='500'
        fontSize='14px'
        // lineHeight='24px'
        textAlign='center'
        mt='12px'
        color='#172A3A'
      >
        {brand?.brandName}
      </Text>
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
      <Center>
        <Button
          fontWeight='400'
          fontSize='14px'
          color='#B4C6D5'
          colorScheme='teal'
          variant='unstyle'
          leftIcon={<HiTrash />}
          onClick={handleRemove}
        >
          Remove
        </Button>
      </Center>
    </Box>
  );
};

export default BrandItemModal;
