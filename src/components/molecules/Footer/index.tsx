import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react';

interface IProps {}
const Footer: React.FC<IProps> = () => {
  return (
    <Flex justifyContent='center' w='full' mb='22px'>
      <Text
        bgColor='#EEF4F9'
        borderRadius='6px'
        padding='5px 10px'
        // font-family: 'Inter';
        fontWeight='400'
        fontSize='11px'
        textAlign='center'
        color='#AFC2D1'
      >
        @thetruesight.com 2022
      </Text>
    </Flex>
  );
};

export default Footer;
