// #region Global Imports
import { Button } from '@chakra-ui/react';
import React from 'react';
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { ICallToActionButton } from './CallToActionButton';
// #endregion Interface Imports

export const CallToActionButton: React.FunctionComponent<ICallToActionButton.IProps> = ({
  ...rest
}: ICallToActionButton.IProps) => (
  <section id="callToActionButton">
    <Button bgColor="brand.500" color="brand.100" borderRadius="full" {...rest}>
      Agendar consulta
    </Button>
  </section>
);
