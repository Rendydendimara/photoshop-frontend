import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { BrandIcon } from 'components/atoms/icons/brand-icon';
import { CategoryIcon } from 'components/atoms/icons/category-icon';
import { FlowIcon } from 'components/atoms/icons/flow-icon';
import { SearchIcon } from 'components/atoms/icons/search-icon';
import { ISearchBrand } from 'interfaces/IBrand';
import { useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useOnClickOutside } from 'usehooks-ts';

interface IProps {
  handleChangeSearch: (e: any) => void;
  handleKeyOnDownKeyword: (e: any) => void;
  onChangeFilterPageView: (data: 'brand' | 'category' | 'flow') => void;
  filterPageView: {
    brand: boolean;
    category: boolean;
    flow: boolean;
  };
  value: string;
  onClickFilterV2: (
    value: string,
    field: 'category' | 'brand'
  ) => Promise<void>;
  filterBrandV2: {
    selectedCategory: string;
    selectedBrand: string;
  };
  resultSearchBrand: ISearchBrand | undefined;
  inputSearchElement: any;
}
const FilterPageView: React.FC<IProps> = (props) => {
  const refSearchBrand: any = useRef();
  const [showSearchBrand, setShowSearchBrand] = useState(false);

  useOnClickOutside(refSearchBrand, () => setShowSearchBrand(false));

  const onFocusInput = () => {
    setShowSearchBrand(true);
  };
  return (
    <Flex
      maxW='1200px'
      // bgColor='red'
      bgColor='white'
      w='full'
      justifyContent='space-between'
      // position='fixed'
      display={{ base: 'none', md: 'flex' }}
      alignItems='center'
      px='12apx'
      boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
      borderRadius='8px'
    >
      <Flex alignItems='center' gap='12px' px='16px' py='15px'>
        <BrandIcon
          showHover
          fill={props.filterPageView.brand ? '#09BC8A' : '#B4C6D4'}
          onClick={() => props.onChangeFilterPageView('brand')}
        />
        <FlowIcon
          showHover
          fill={props.filterPageView.flow ? '#09BC8A' : '#B4C6D4'}
          onClick={() => props.onChangeFilterPageView('flow')}
        />
        {/* <CategoryIcon
          showHover
          fill={props.filterPageView.category ? '#09BC8A' : '#B4C6D4'}
          onClick={() => props.onChangeFilterPageView('category')}
        /> */}
        <svg
          width='2'
          height='27'
          viewBox='0 0 2 27'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <line
            x1='1'
            y1='1.5'
            x2='0.999999'
            y2='25.5'
            stroke='#EEF4F9'
            stroke-width='2'
            stroke-linecap='round'
          />
        </svg>
        <Text
          fontWeight='500'
          fontSize='16px'
          lineHeight='19px'
          color='#172A3A'
        >
          {props.filterPageView.brand
            ? 'Brands'
            : props.filterPageView.category
            ? 'Category'
            : props.filterPageView.flow
            ? 'Flow'
            : ''}
        </Text>
      </Flex>
      <Box p='12px' w='full' maxW='320px' position='relative' bgColor='white'>
        <InputGroup bgColor='#FAFAFA'>
          <InputLeftElement
            // display={{ base: 'flex', md: 'none' }}
            pointerEvents='none'
            mt='5px'
            children={<SearchIcon showHover />}
          />
          <Input
            ref={props.inputSearchElement}
            width={{ base: 'full', md: '320px' }}
            height={{ base: '41px', md: '49px' }}
            borderColor='transparent'
            onChange={props.handleChangeSearch}
            borderRadius='12px'
            onKeyDown={props.handleKeyOnDownKeyword}
            placeholder='Ex Gojek, Cart, or Fashion'
            _placeholder={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#91A5B6',
            }}
            value={props.value}
            onFocus={onFocusInput}
          />
        </InputGroup>
        {showSearchBrand && (
          <Box
            w='full'
            mt='8px'
            p='6px'
            ref={refSearchBrand}
            border='1px solid #172A3A'
            borderRadius='8px'
            position='absolute'
            maxH='300px'
            overflowY='scroll'
            zIndex='100000'
            bgColor='white'
            className='styled-scrollbar'
          >
            {/* Result Brand */}
            <Box>
              <Text
                padding='8px'
                fontWeight='500'
                fontSize='14px'
                lineHeight='17px'
                color='#172A3A'
                borderBottom='0.5px solid #C4D7E8'
              >
                Brand
              </Text>
              {props.resultSearchBrand &&
                props.resultSearchBrand.brands.map((brand, i) => (
                  <Flex
                    key={i}
                    onClick={() => props.onClickFilterV2(brand._id, 'brand')}
                    p='8px'
                    _hover={{ cursor: 'pointer' }}
                    borderBottom={
                      i + 1 === props?.resultSearchBrand?.brands.length
                        ? 'unset'
                        : '0.5px solid #C4D7E8'
                    }
                    alignItems='center'
                    gap='12px'
                    bgColor={
                      brand._id === props.filterBrandV2.selectedBrand
                        ? '#F1FFF8'
                        : 'white'
                    }
                  >
                    <Image
                      src={
                        brand.brandImage
                          ? brand.brandImage
                          : './images/shoope.png'
                      }
                      width='42px'
                      height='32px'
                      objectFit='contain'
                      objectPosition='center'
                    />
                    <Box>
                      <Text fontWeight='400' fontSize='16px' color='#09BC8A'>
                        {brand.brandName}
                      </Text>
                      {brand.tags.length > 0 && (
                        <Flex gap='4px' mt='4px' alignItems='center'>
                          {brand.tags.map((tag, i) => (
                            <Text
                              fontWeight='400'
                              fontSize='11px'
                              color='#3E97FF'
                              key={i}
                            >
                              {tag}
                            </Text>
                          ))}
                        </Flex>
                      )}
                    </Box>
                  </Flex>
                ))}
            </Box>
            {/* Result Category */}
            <Box mt='8px'>
              <Text
                padding='8px'
                fontWeight='500'
                fontSize='14px'
                lineHeight='17px'
                color='#172A3A'
                borderBottom='0.5px solid #C4D7E8'
              >
                Category
              </Text>
              {props.resultSearchBrand &&
                props.resultSearchBrand.categories.map((category, i) => (
                  <Flex
                    _hover={{ cursor: 'pointer' }}
                    key={i}
                    onClick={() =>
                      props.onClickFilterV2(category._id, 'category')
                    }
                    p='12px 8px'
                    bgColor={
                      i + 1 === props?.resultSearchBrand?.categories?.length
                        ? '#F1FFF8'
                        : 'white'
                    }
                    borderBottom={
                      category._id === props.filterBrandV2.selectedCategory
                        ? 'unset'
                        : '0.5px solid #C4D7E8'
                    }
                    alignItems='center'
                    gap='12px'
                    justifyContent='space-between'
                  >
                    <Text fontWeight='400' fontSize='16px' color='#172A3A'>
                      {category.name}
                    </Text>
                    <Text fontWeight='400' fontSize='11px' color='#B4C6D4'>
                      {category.totalBrand} Brand {category.totalScreens} Screen
                    </Text>
                  </Flex>
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default FilterPageView;
