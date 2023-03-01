import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { ApiGetDetailBrand } from 'api/brand';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { shimmer, toBase64 } from 'utils/imageOptimization';

interface IBrandSelected {
  fieldName: string;
  brandId: string;
  onRemove: (brandId: string, fieldName: string) => void;
}

interface IBrandItem {
  id: string;
  name: string;
  logoSmall: string;
  moduleCount: number;
  screenCount: number;
}

const BrandItemModal: React.FC<IBrandSelected> = (props) => {
  const [brand, setBrand] = useState<IBrandItem>();
  const getDetailBrand = async () => {
    const res = await ApiGetDetailBrand(props.brandId, {
      type: 'simple-compare',
    });
    if (res.status === 200) {
      setBrand(res.data.data);
    }
  };

  const handleRemove = () => {
    props.onRemove(brand?.id ?? '', props.fieldName);
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
        <Image
          alt='shoope'
          src={
            brand === undefined || brand?.logoSmall.length === 0
              ? '/images/shoope.png'
              : brand?.logoSmall
          }
          width={144}
          height={153}
          placeholder='blur'
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 700)
          )}`}
          objectFit='contain'
          objectPosition='center'
        />
      </Flex>
      <Text
        fontWeight='500'
        fontSize='14px'
        // lineHeight='24px'
        textAlign='center'
        mt='12px'
        color='#172A3A'
      >
        {brand?.name}
      </Text>
      <Text
        fontWeight='500'
        fontSize='12px'
        // lineHeight='24px'
        textAlign='center'
        mt='4px'
        color='#B4C6D4'
      >
        {brand?.moduleCount} Module {brand?.screenCount} Screen
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
