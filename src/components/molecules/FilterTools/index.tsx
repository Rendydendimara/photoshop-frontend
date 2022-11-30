import { Box } from '@chakra-ui/layout';
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
}

const FilterTools: React.FC<IProps> = (props) => {
  return (
    <Box ref={props.refSidebar} id='sidebarContainer'>
      <FilterCheckbox labelName='Categories'>
        {props.listCategory.map((category, i) => (
          <CheckboxItem
            key={i}
            marginBtm={i + 1 === props.listCategory.length ? 0 : '24px'}
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
        <Box mt='24px'>
          <FilterCheckbox labelName='Flow'>
            {props.listFlow.map((flow, i) => (
              <CheckboxItem
                key={i}
                marginBtm={i + 1 === props.listFlow.length ? 0 : '24px'}
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
      <Box mt='24px'>
        <FilterCheckbox labelName='Price'>
          {props.FILTER_PRICE.map((price, i) => (
            <CheckboxItem
              key={i}
              marginBtm={i + 1 === props.FILTER_PRICE.length ? 0 : '24px'}
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
    </Box>
  );
};

export default FilterTools;
