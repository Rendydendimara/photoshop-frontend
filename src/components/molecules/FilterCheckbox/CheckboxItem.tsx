import { Checkbox } from '@chakra-ui/checkbox';
import { Flex, Text } from '@chakra-ui/layout';

interface IProps {
  marginBtm: any;
  icon: any;
  value: any;
  onChange: (e: any) => void;
  fontWeight: any;
  name: any;
  colorCount: any;
  totalCount: any;
}

const CheckboxItem: React.FC<IProps> = (props) => {
  return (
    <Flex
      justifyContent='space-between'
      mb={props.marginBtm}
      alignItems='center'
    >
      <Checkbox
        colorScheme=''
        icon={props.icon}
        border='none'
        name={props.value}
        onChange={props.onChange}
      >
        <Text
          fontWeight={props.fontWeight}
          fontSize='14px'
          lineHeight='150%'
          color='#172A3A'
          as='span'
          ml='4px'
          textTransform='capitalize'
          _hover={{ color: '#09BC8A' }}
        >
          {props.name}
        </Text>
      </Checkbox>
      <Text
        fontWeight='400'
        fontSize='12px'
        lineHeight='14px'
        color={props.colorCount}
      >
        ({props.totalCount})
      </Text>
    </Flex>
  );
};

export default CheckboxItem;
