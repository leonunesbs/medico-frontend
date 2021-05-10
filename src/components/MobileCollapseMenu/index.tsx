// #region Global Imports
import { Collapse } from '@chakra-ui/react';
import { CallToActionButton } from '@/components';
import React from 'react';
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IMobileCollapseMenu } from './MobileCollapseMenu';
// #endregion Interface Imports

export const MobileCollapseMenu: React.FunctionComponent<IMobileCollapseMenu.IProps> = ({
  disclosure,
  ...rest
}: IMobileCollapseMenu.IProps) => (
  <section id="mobileCollapseMenu">
    <Collapse in={disclosure.isOpen} animateOpacity unmountOnExit {...rest}>
      <CallToActionButton>Agendar consulta</CallToActionButton>
    </Collapse>
  </section>
);
