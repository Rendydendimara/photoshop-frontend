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
        boxShadow='md'
        justifyContent='center'
        alignItems='center'
        minW='240px'
        minH='190px'
      >
        <ChakraImage alt='shoope' src='/images/shoope.png' />{' '}
      </Flex>
      <Text
        fontWeight='700'
        fontSize='14px'
        lineHeight='24px'
        textAlign='center'
        mt='4'
      >
        {brand?.brandName}
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
