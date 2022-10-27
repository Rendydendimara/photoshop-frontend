import { Box } from '@chakra-ui/layout';
import Footer from 'components/molecules/Footer';
import Navbar from 'components/molecules/Navbar';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  showInfoBeta?: boolean;
  showNavbarFooter?: boolean;
}

const AppTemplate: React.FC<IProps> = (props) => {
  return (
    // <Flex justifyContent='center'>
    <Box>
      {props.showNavbarFooter && <Navbar />}
      <Box minH='100vh'>{props.children}</Box>
      {/* Footer */}
      {props.showNavbarFooter && <Footer />}
    </Box>
    // </Flex>
  );
};

export default AppTemplate;
