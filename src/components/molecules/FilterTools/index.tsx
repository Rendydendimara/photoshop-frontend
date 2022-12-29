import { Button } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import { IListFlow } from 'interfaces/IBrand';
import { ICategory } from 'interfaces/ICategory';
import FilterCheckbox from '../FilterCheckbox';
import CheckboxItem from '../FilterCheckbox/CheckboxItem';

interface IProps {
  refSidebar: any;
  showFlowFilter?: boolean;
  listFlow: IListFlow[];
  listCategory: ICategory[];
  onChangeFilterFlow: (e: any) => void;
  onChangeFilterCategory: (e: any) => void;
  onChangeFilterPrice: (e: any) => void;
  filterBrandByFlow: {
    flows: string[];
    categories: string[];
    price: string[];
  };
  FILTER_PRICE: any[];
  showFilterPrice: boolean;
  showFilterModule: boolean;
}

const FilterTools: React.FC<IProps> = (props) => {
  const onClickModule = (name: string) => {
    props.onChangeFilterFlow({ target: { name: name } });
  };
  return (
    <Box ref={props.refSidebar} id='sidebarContainer'>
      <FilterCheckbox labelName='Categories'>
        {props.listCategory.map((category, i) => (
          <CheckboxItem
            key={i}
            marginBtm={i + 1 === props.listCategory.length ? 0 : '12px'}
            icon={
              props.filterBrandByFlow.categories.includes(category._id) ? (
                <CheckboxCheckedIcon />
              ) : (
                <CheckboxIcon />
              )
            }
            value={category._id}
            onChange={props.onChangeFilterCategory}
            fontWeight={
              props.filterBrandByFlow.categories.includes(category._id)
                ? '600'
                : '400'
            }
            name={category.name}
            colorCount={
              props.filterBrandByFlow.categories.includes(category._id)
                ? '#172A3A'
                : '#8FA2B1'
            }
            totalCount={category.totalBrand}
          />
        ))}
      </FilterCheckbox>
      {props.showFlowFilter && (
        <Box mt='16px'>
          <FilterCheckbox labelName='Flow'>
            {props.listFlow.map((flow, i) => (
              <CheckboxItem
                key={i}
                marginBtm={i + 1 === props.listFlow.length ? 0 : '12px'}
                icon={
                  props.filterBrandByFlow.flows.includes(flow._id) ? (
                    <CheckboxCheckedIcon />
                  ) : (
                    <CheckboxIcon />
                  )
                }
                value={flow._id}
                onChange={props.onChangeFilterFlow}
                fontWeight={
                  props.filterBrandByFlow.flows.includes(flow._id)
                    ? '600'
                    : '400'
                }
                name={flow._id}
                colorCount={
                  props.filterBrandByFlow.flows.includes(flow._id)
                    ? '#172A3A'
                    : '#8FA2B1'
                }
                totalCount={flow.count}
              />
            ))}
          </FilterCheckbox>
        </Box>
      )}
      {props.showFilterPrice && (
        <Box mt='16px'>
          <FilterCheckbox labelName='Price'>
            {props.FILTER_PRICE.map((price, i) => (
              <CheckboxItem
                key={i}
                marginBtm={i + 1 === props.FILTER_PRICE.length ? 0 : '12px'}
                icon={
                  props.filterBrandByFlow.price.includes(price.value) ? (
                    <CheckboxCheckedIcon />
                  ) : (
                    <CheckboxIcon />
                  )
                }
                value={price.value}
                onChange={props.onChangeFilterPrice}
                fontWeight={
                  props.filterBrandByFlow.price.includes(price.value)
                    ? '600'
                    : '400'
                }
                name={price.name}
                colorCount={
                  props.filterBrandByFlow.price.includes(price.value)
                    ? '#172A3A'
                    : '#8FA2B1'
                }
                totalCount={price.count}
              />
            ))}
          </FilterCheckbox>
        </Box>
      )}
      {props.showFilterModule && (
        <Box
          width='248px'
          mt='16px'
          borderRadius='8px'
          border='1px solid #EBEBEB'
          backgroundColor='white'
          borderTopRightRadius='2px'
          borderTopLeftRadius='2px'
        >
          <Text
            fontWeight='700'
            fontSize='14px'
            lineHeight='21px'
            color='#172A3A'
            padding='24px 28px'
            pb='0'
          >
            Module
          </Text>
          <Box pl='28px' pr='14px'>
            <Box
              maxH={{ md: '320px', xl: '400px' }}
              overflowY='scroll'
              className='styled-scrollbar'
            >
              <Flex
                minW={'236px'}
                maxWidth={'236px'}
                gap='8px'
                pr='14px'
                flexWrap='wrap'
              >
                {props.listFlow.map((flow, i) => (
                  <Button
                    _hover={{ cursor: 'pointer' }}
                    p='6px 8px'
                    border='1px solid #172A3A'
                    borderRadius='4px'
                    bgColor={
                      props.filterBrandByFlow.flows.includes(flow._id)
                        ? '#004346'
                        : 'transparent'
                    }
                    color={
                      props.filterBrandByFlow.flows.includes(flow._id)
                        ? '#FBFFFE'
                        : '#172A3A'
                    }
                    onClick={() => onClickModule(flow._id)}
                  >
                    {flow._id}
                  </Button>
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterTools;
