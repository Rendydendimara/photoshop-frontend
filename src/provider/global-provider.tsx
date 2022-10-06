import { Box, Spinner, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

export interface IGlobalContextProps {
  loading: boolean;
  showToast: ({
    title,
    message,
    type,
  }: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error' | undefined;
  }) => void;
  children: React.ReactNode;
  onCloseModalNameConvention: () => void;
  onOpenModalNameConvention: () => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>(
  {} as IGlobalContextProps
);

export const useGlobalContext = () => React.useContext(GlobalContext);

export const GlobalProvider = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  const toast = useToast();
  const [openModalNameConvention, setOpenModalNameConvention] = useState(false);
  const showToast = ({
    title,
    message,
    type,
  }: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error' | undefined;
  }) => {
    toast({
      title,
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
    });
  };
  const onCloseModalNameConvention = () => {
    setOpenModalNameConvention(false);
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'unset';
    }
  };
  const onOpenModalNameConvention = () => {
    setOpenModalNameConvention(true);
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        showToast,
        children,
        onCloseModalNameConvention,
        onOpenModalNameConvention,
      }}
    >
      {loading ? (
        <Box h={'100vh'} w={'100%'} display='flex' justifyContent={'center'}>
          <Spinner alignSelf={'center'} w={70} h={70} />
        </Box>
      ) : (
        children
      )}
    </GlobalContext.Provider>
  );
};
