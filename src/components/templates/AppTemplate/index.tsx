import { Box } from '@chakra-ui/layout';
import Footer from 'components/molecules/Footer';
import Navbar from 'components/molecules/Navbar';
import React, { ReactNode } from 'react';

interface IPX {
  sm?: string;
  md?: string;
  xl?: string;
}
interface IProps {
  children: ReactNode;
  px?: IPX;
}

const AppTemplate: React.FC<IProps> = (props) => {
  return (
    <Box
      px={{
        sm: props.px?.sm ?? '16px',
        md: props.px?.md ?? '100px',
        xl: props.px?.xl ?? '167px',
      }}
      minH='100vh'
    >
      {props.children}
    </Box>
  );
};

export default AppTemplate;
