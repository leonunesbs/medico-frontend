// #region Global Imports
import React from 'react';
import { Flex, useTheme } from '@chakra-ui/react';
import { Squash as Hamburger } from 'hamburger-react';
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IHamburgerMenu } from './HamburgerMenu';
// #endregion Interface Imports

export const HamburgerMenu: React.FunctionComponent<IHamburgerMenu.IProps> = ({
  disclosure,
  ...rest
}: IHamburgerMenu.IProps) => {
  const theme = useTheme();
  return (
    <section id="hamburgerMenu">
      <Flex {...rest}>
        <Hamburger
          size={25}
          color={
            disclosure.isOpen
              ? theme.colors.brand[500]
              : theme.colors.brand[700]
          }
          toggled={disclosure.isOpen}
          toggle={disclosure.onToggle}
        />
      </Flex>
    </section>
  );
};
