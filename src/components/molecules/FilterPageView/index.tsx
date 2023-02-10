import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
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
  changeShowPreview: (e: any) => void;
  showPreview: boolean;
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
      p='12px'
      boxShadow='0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.06)'
      borderRadius='8px'
    >
      <Flex alignItems='center' gap='68px'>
        <Flex bgColor='#FFFFFF' borderRadius='8px'>
          <Button
            bgColor={
              props.filterPageView.brand ? 'rgba(9, 188, 138, 0.15)' : '#FFFFFF'
            }
            border={
              props.filterPageView.brand
                ? '1px solid #09BC8A'
                : '1px solid #91A5B6'
            }
            borderRightWidth={
              props.filterPageView.brand ? '1px' : '0px !important'
            }
            borderTopRightRadius='0'
            borderBottomRightRadius='0'
            w='111px'
            leftIcon={
              <BrandIcon
                fill={props.filterPageView.brand ? '#09BC8A' : '#B4C6D4'}
              />
            }
            onClick={() => props.onChangeFilterPageView('brand')}
            fontWeight='500'
            fontSize='14px'
            color={props.filterPageView.brand ? '#172A3A' : '#91A5B6'}
          >
            Brand
          </Button>
          <Button
            fontWeight='500'
            fontSize='14px'
            color={props.filterPageView.flow ? '#172A3A' : '#91A5B6'}
            borderLeftWidth={
              props.filterPageView.flow ? '1px' : '0px !important'
            }
            borderTopLeftRadius='0'
            borderBottomLeftRadius='0'
            bgColor={
              props.filterPageView.flow ? 'rgba(9, 188, 138, 0.15)' : '#FFFFFF'
            }
            border={
              props.filterPageView.flow
                ? '1px solid #09BC8A'
                : '1px solid #91A5B6'
            }
            w='111px'
            leftIcon={
              <FlowIcon
                fill={props.filterPageView.flow ? '#09BC8A' : '#B4C6D4'}
              />
            }
            onClick={() => props.onChangeFilterPageView('flow')}
          >
            Flow
          </Button>
        </Flex>
        <Box w='full' maxW='320px' position='relative' bgColor='white'>
          <InputGroup
            borderRadius='8px'
            h='53px'
            p='16px 12px'
            bgColor='#FAFAFA'
            display='flex'
            alignItems='center'
            // w='526px'
          >
            <InputLeftElement
              // display={{ base: 'flex', md: 'none' }}
              pointerEvents='none'
              children={<SearchIcon showHover />}
              w='14px'
              position='initial'
              mr='8px'
            />
            <Input
              p='0'
              ref={props.inputSearchElement}
              width={{ base: 'full', md: '320px' }}
              // height={{ base: '41px', md: '49px' }}
              borderColor='transparent'
              onChange={props.handleChangeSearch}
              onKeyDown={props.handleKeyOnDownKeyword}
              placeholder='Ex Gojek, Cart, or Fashion'
              _placeholder={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                color: '#91A5B6',
              }}
              _focus={{}}
              _active={{}}
              _hover={{}}
              _focusVisible={{}}
              value={props.value}
              onFocus={onFocusInput}
            />
          </InputGroup>
          {props.value && showSearchBrand && (
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
                        {category.totalBrand} Brand {category.totalScreens}{' '}
                        Screen
                      </Text>
                    </Flex>
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
      {props.filterPageView.brand && (
        <Flex alignItems='center' gap='12px'>
          <Text fontWeight='500' fontSize='14px' color='#172A3A'>
            Show Preview:
          </Text>
          <Switch
            isChecked={props.showPreview}
            onChange={props.changeShowPreview}
            id='showPreview'
          />
        </Flex>
      )}
    </Flex>
  );
};

export default FilterPageView;
