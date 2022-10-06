import { Box } from '@chakra-ui/layout';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  showInfoBeta?: boolean;
}

const AppTemplate: React.FC<IProps> = (props) => {
  return (
    // <Flex justifyContent='center'>
    <Box>
      {props.children}
      {/* Footer */}
    </Box>
    // </Flex>
  );
};

export default AppTemplate;
