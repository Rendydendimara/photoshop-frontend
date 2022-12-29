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
      maxWidth={props.width ?? '248px'}
      backgroundColor='white'
      borderRadius='8px'
      border='1px solid #EBEBEB'
      borderTopRightRadius='2px'
      borderTopLeftRadius='2px'
    >
      <Text
        padding='24px 28px'
        pb='0'
        fontWeight='700'
        fontSize='14px'
        lineHeight='21px'
        color='#172A3A'
      >
        {props.labelName}
      </Text>
      <Box
        maxH={{ md: '320px', xl: '400px' }}
        overflowY='scroll'
        className='styled-scrollbar'
        padding='24px 28px'
      >
        <Box w='full'>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default FilterCheckbox;
