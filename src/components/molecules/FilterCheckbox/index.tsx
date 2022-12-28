import { Box, Text } from '@chakra-ui/layout';

interface IProps {
  labelName: string;
  children: any;
  width?: any;
}

const FilterCheckbox: React.FC<IProps> = (props) => {
  return (
    <Box
      minW={props.width ?? '248px'}
      padding='24px 28px'
      maxWidth={props.width ?? '248px'}
      backgroundColor='white'
      // boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
      borderRadius='8px'
      border='1px solid #EBEBEB'
      height='fit-content'
      maxH={{ md: '320px', xl: '400px' }}
      overflowY='scroll'
      className='styled-scrollbar'
    >
      <Text fontWeight='700' fontSize='14px' lineHeight='21px' color='#172A3A'>
        {props.labelName}
      </Text>
      <Box w='full' mt='16px'>
        {props.children}
      </Box>
    </Box>
  );
};

export default FilterCheckbox;
