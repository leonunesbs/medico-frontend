// #region Global Imports
import { Button } from '@chakra-ui/react'
import React from 'react'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { ICallToActionButton } from './CallToActionButton'
// #endregion Interface Imports

export const CallToActionButton: React.FunctionComponent<ICallToActionButton.IProps> = ({
  text,
  ...rest
}: ICallToActionButton.IProps) => (
  <Button
    bgColor="brand.500"
    color="brand.100"
    borderRadius="full"
    fontWeight="bold"
    _active={{ bgColor: 'brand.800', color: 'brand.500' }}
    _hover={{ bgColor: 'brand.700' }}
    {...rest}
  >
    {text || 'Agendar consulta'}
  </Button>
)
