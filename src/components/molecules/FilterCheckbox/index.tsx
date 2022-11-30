import { Box, Text } from '@chakra-ui/layout';

interface IProps {
  labelName: string;
  children: any;
  width?: any;
}

const FilterCheckbox: React.FC<IProps> = (props) => {
  return (
    <Box
      minW={props.width ?? '236px'}
      padding='37px 28px'
      maxWidth={props.width ?? '236px'}
      backgroundColor='white'
      boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
      borderRadius='8px'
      height='fit-content'
      maxH={{ md: '320px', xl: '400px' }}
      overflowY='scroll'
      className='styled-scrollbar'
    >
      <Text fontWeight='500' fontSize='16px' lineHeight='19px' color='#172A3A'>
        {props.labelName}
      </Text>
      <Box w='full' mt='32px'>
        {props.children}
      </Box>
    </Box>
  );
};

export default FilterCheckbox;
