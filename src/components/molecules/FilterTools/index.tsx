import { Checkbox } from '@chakra-ui/checkbox';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { ApiGetListModules } from 'api/brand';
import { CheckboxCheckedIcon } from 'components/atoms/icons/checkbox-checked-icon';
import { CheckboxIcon } from 'components/atoms/icons/checkbox-icon';
import { IListFlow } from 'interfaces/IBrand';
import { ICategory } from 'interfaces/ICategory';
import { useState } from 'react';

interface IProps {
  refSidebar: any;
  showFlowFilter?: boolean;
  listFlow: IListFlow[];
  listCategory: ICategory[];
  onChangeFilterFlow: (e: any) => void;
  onChangeFilterCategory: (e: any) => void;
  filterBrandByFlow: {
    flows: string[];
    categories: string[];
  };
}

const FilterTools: React.FC<IProps> = (props) => {
  return (
    <Box ref={props.refSidebar} id='sidebarContainer' position='fixed'>
      <Box
        w='236px'
        padding='37px 28px'
        maxWidth='236px'
        backgroundColor='white'
        boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
        borderRadius='8px'
        height='fit-content'
        maxH={{ md: '320px', xl: '400px' }}
        overflowY='scroll'
        className='styled-scrollbar'
      >
        <Text
          fontWeight='500'
          fontSize='16px'
          lineHeight='19px'
          color='#172A3A'
        >
          Categories
        </Text>
        <Box w='full' mt='32px'>
          {props.listCategory.map((category, i) => (
            <Flex
              justifyContent='space-between'
              mb={i + 1 === props.listCategory.length ? 0 : '24px'}
              key={i}
              alignItems='center'
            >
              <Checkbox
                colorScheme=''
                icon={
                  props.filterBrandByFlow.categories.includes(category._id) ? (
                    <CheckboxCheckedIcon />
                  ) : (
                    <CheckboxIcon />
                  )
                }
                name={category._id}
                onChange={props.onChangeFilterCategory}
                // key={i}
              >
                <Text
                  fontWeight='500'
                  fontSize='14px'
                  lineHeight='150%'
                  color='#172A3A'
                  as='span'
                  ml='4px'
                  textTransform='capitalize'
                >
                  {category.name}
                </Text>
              </Checkbox>
              <Text
                fontWeight='400'
                fontSize='12px'
                lineHeight='14px'
                color='#8FA2B1'
              >
                ({category.totalBrand})
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
      {props.showFlowFilter && (
        <Box
          w='236px'
          padding='37px 28px'
          maxWidth='236px'
          backgroundColor='white'
          boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
          borderRadius='8px'
          height='fit-content'
          mt='24px'
          maxH={{ md: '320px', xl: '400px' }}
          overflowY='scroll'
          className='styled-scrollbar'
        >
          <Text
            fontWeight='500'
            fontSize='16px'
            lineHeight='19px'
            color='#172A3A'
          >
            Flow
          </Text>
          <Box w='full' mt='32px'>
            {props.listFlow.map((flow, i) => (
              <Flex
                key={i}
                justifyContent='space-between'
                mb={i + 1 === props.listFlow.length ? 0 : '24px'}
                alignItems='center'
              >
                <Checkbox
                  colorScheme=''
                  icon={
                    props.filterBrandByFlow.flows.includes(flow._id) ? (
                      <CheckboxCheckedIcon />
                    ) : (
                      <CheckboxIcon />
                    )
                  }
                  name={flow._id}
                  onChange={props.onChangeFilterFlow}
                  key={i}
                >
                  <Text
                    fontWeight='500'
                    fontSize='14px'
                    lineHeight='150%'
                    color='#172A3A'
                    as='span'
                    ml='4px'
                    textTransform='capitalize'
                  >
                    {flow._id}
                  </Text>
                </Checkbox>
                <Text
                  fontWeight='400'
                  fontSize='12px'
                  lineHeight='14px'
                  color='#8FA2B1'
                >
                  ({flow.count})
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterTools;
