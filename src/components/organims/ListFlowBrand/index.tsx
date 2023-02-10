import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout';

interface IProps {}

const DUMMY_DATA_FLOW = [
  {
    flowName: 'Login',
    description: 'when customer start uising our apps',
    brands: [
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
    ],
  },
  {
    flowName: 'Login',
    description: 'when customer start uising our apps',
    brands: [
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
    ],
  },
  {
    flowName: 'Login',
    description: 'when customer start uising our apps',
    brands: [
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
    ],
  },
  {
    flowName: 'Login',
    description: 'when customer start uising our apps',
    brands: [
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
    ],
  },
  {
    flowName: 'Login',
    description: 'when customer start uising our apps',
    brands: [
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
    ],
  },
  {
    flowName: 'Login',
    description: 'when customer start uising our apps',
    brands: [
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
      {
        brandIcon: './images/shoope.png',
        images: './images/example-shoope-image.png',
      },
    ],
  },
];

const ListFlowBrand: React.FC<IProps> = () => {
  return (
    <SimpleGrid
      w='full'
      columns={{ sm: 1, md: 2 }}
      gap={{ base: '16px', md: '30px', xl: '79px' }}
    >
      {DUMMY_DATA_FLOW.map((flow, index) => (
        <Box key={index}>
          {/* Header */}
          <Flex justifyContent='space-between' alignItems='flex-end'>
            <Box maxW='70%'>
              <Text
                fontWeight='700'
                fontSize='16px'
                lineHeight='24px'
                color='#172A3A'
              >
                {flow.flowName}
              </Text>
              <Text
                fontWeight='500'
                fontSize='14px'
                lineHeight='21px'
                color='#172A3A'
              >
                {flow.description}
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
            {flow.brands.map((brandFlow, index2) => (
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                gap='8px'
              >
                {/* Brand Icon */}
                <Image
                  src={
                    // './images/shoope.png'
                    brandFlow.brandIcon === undefined ||
                    brandFlow.brandIcon.length === 0
                      ? './images/shoope.png'
                      : brandFlow.brandIcon
                  }
                  width='95px'
                  height='35px'
                  alt='shoope logo'
                  // width='full'
                  objectFit='contain'
                  objectPosition='center'
                />
                {/* Brand Images */}
                <Image
                  src={brandFlow.images}
                  width={{ base: '144px', md: '200px' }}
                  height='354px'
                  objectFit='contain'
                  objectPosition='center'
                  border='2px solid #172A3A'
                  borderRadius='16px'
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
