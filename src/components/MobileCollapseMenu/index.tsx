// #region Global Imports
import { Collapse, Flex } from '@chakra-ui/react'
import { CallToActionButton } from '@/components'
import React from 'react'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IMobileCollapseMenu } from './MobileCollapseMenu'
import { HeaderMenu } from '../HeaderMenu'
// #endregion Interface Imports

export const MobileCollapseMenu: React.FunctionComponent<IMobileCollapseMenu.IProps> = ({
  disclosure,
  ...rest
}: IMobileCollapseMenu.IProps) => (
  <section id="mobileCollapseMenu">
    <Collapse in={disclosure.isOpen} animateOpacity unmountOnExit {...rest}>
      <Flex align="center" justify="center">
        <Flex flexDir="column" flexGrow={1} maxW="1280px" p={4}>
          <HeaderMenu
            flexDir="column"
            align="flex-start"
            disclosure={disclosure}
            mobileIcon
          />
          <Flex
            h="px"
            bgColor="rgba(0,0,0,0.1)"
            maxW="50%"
            my={2}
            alignSelf="center"
          />
          <CallToActionButton>Agendar consulta</CallToActionButton>
        </Flex>
      </Flex>
    </Collapse>
  </section>
)
