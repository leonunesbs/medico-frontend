// #region Global Imports
import React from 'react'
import { Flex, IconButton, useTheme } from '@chakra-ui/react'
import { Squash as Hamburger } from 'hamburger-react'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IHamburgerMenu } from '@/interfaces'
// #endregion Interface Imports

export const HamburgerMenu: React.FunctionComponent<IHamburgerMenu.IProps> = ({
  disclosure,
  ...rest
}: IHamburgerMenu.IProps) => {
  const theme = useTheme()
  return (
    <Flex {...rest}>
      <IconButton
        bgColor={disclosure.isOpen ? 'brand.500' : 'transparent'}
        borderRadius="full"
        p={0}
        m={1}
        transition="background 0.2s ease-in"
        aria-label="hamburger-menu"
        _active={{}}
        _hover={{}}
        icon={
          <Hamburger
            size={20}
            label="mobileMenu"
            hideOutline={true}
            color={
              disclosure.isOpen
                ? theme.colors.brand[100]
                : theme.colors.brand[500]
            }
            toggled={disclosure.isOpen}
            toggle={disclosure.onToggle}
          />
        }
      />
    </Flex>
  )
}
