// #region Global Imports
import React from 'react'
import { Button, IconButton } from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { ICallToActionButton } from '@/interfaces'
// #endregion Interface Imports

export const CallToActionButton: React.FunctionComponent<ICallToActionButton.IProps> = ({
  text,
  ...rest
}: ICallToActionButton.IProps) => (
  <>
    {text ? (
      <IconButton
        aria-label="Agendar consulta"
        bgColor="brand.500"
        color="brand.100"
        borderRadius="full"
        fontWeight="bold"
        _active={{ bgColor: 'brand.800', color: 'brand.500' }}
        _hover={{ bgColor: 'brand.600' }}
        icon={text}
        {...rest}
      />
    ) : (
      <Button
        bgColor="brand.500"
        color="brand.100"
        borderRadius="full"
        fontWeight="bold"
        _active={{ bgColor: 'brand.800', color: 'brand.500' }}
        _hover={{ bgColor: 'brand.600' }}
        {...rest}
      >
        Agendar consulta
      </Button>
    )}
  </>
)
