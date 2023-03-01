import { Button } from '@chakra-ui/button';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';
import { IModuleV2 } from 'interfaces/IModule';
import Image from 'next/image';
import { shimmer, toBase64 } from 'utils/imageOptimization';

interface IProps {
  listFlow: IModuleV2[];
}

const ListFlowBrand: React.FC<IProps> = (props) => {
  return (
    <SimpleGrid
      w='full'
      columns={{ sm: 1, md: 2 }}
      gap={{ base: '16px', md: '30px', xl: '79px' }}
    >
      {props.listFlow.map((flow, index) => (
        <Box key={index} w='full'>
          {/* Header */}
          <Flex justifyContent='space-between' w='full' alignItems='flex-end'>
            <Box maxW='70%'>
              <Text
                fontWeight='700'
                fontSize='16px'
                lineHeight='24px'
                color='#172A3A'
              >
                {flow.name}
              </Text>
              <Text
                fontWeight='500'
                fontSize='14px'
                lineHeight='21px'
                color='#172A3A'
              >
                {flow.description ?? '-'}
              </Text>
            </Box>
            <Box>
              <Button
                bgColor='#07A377'
                boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
                borderRadius='8px'
                fontWeight='500'
                fontSize='14px'
                color='#fff'
                width='99px'
                height='37px'
                _hover={{}}
              >
                Explore
              </Button>
            </Box>
          </Flex>
          {/* Content */}

          <Flex alignItems='center' gap='28px'>
            {flow.screen.map((brandFlow, index2) => (
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                gap='8px'
              >
                {/* Brand Icon */}
                <Image
                  src={
                    brandFlow.brand.logoSmall === undefined ||
                    brandFlow.brand.logoSmall.length === 0
                      ? './images/shoope.png'
                      : brandFlow.brand.logoSmall
                  }
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 700)
                  )}`}
                  width={95}
                  height={35}
                  alt='shoope logo'
                  objectFit='contain'
                  objectPosition='center'
                />
                {/* Brand Images */}
                <Image
                  src={brandFlow.images[0]}
                  width={200}
                  height={354}
                  objectFit='contain'
                  objectPosition='center'
                  style={{
                    border: '2px solid #172A3A',
                    borderRadius: '16px',
                  }}
                  alt='test'
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 700)
                  )}`}
                />
              </Flex>
            ))}
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ListFlowBrand;
