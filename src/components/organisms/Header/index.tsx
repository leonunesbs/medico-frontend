// #region Global Imports
import React, { useRef } from 'react'
import { Flex, useDisclosure, useOutsideClick } from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
import {
  CallToActionButton,
  HamburgerMenu,
  HeaderMenu,
  HeaderLogo,
  MobileCollapseMenu
} from '@/components'
// #endregion Local Imports

// #region Interface Imports
import { IHeader } from '@/interfaces'
// #endregion Interface Imports

export const Header: React.FunctionComponent<IHeader.IProps> = ({
  ...rest
}: IHeader.IProps) => {
  const mobileNavDisclosure = useDisclosure()
  const headerRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: headerRef,
    handler: () => mobileNavDisclosure.onClose()
  })
  return (
    <section id="header">
      <Flex
        ref={headerRef}
        bgColor="brand.100"
        boxShadow="base"
        flexDir="column"
        {...rest}
      >
        <Flex justify="center" p={2}>
          <Flex
            flexGrow={1}
            align="center"
            justify="space-between"
            maxW="1280px"
          >
            <Flex>
              <HeaderLogo disclosure={mobileNavDisclosure} />
            </Flex>
            <Flex>
              <HeaderMenu d={['none', 'none', 'none', 'none', 'flex']} />
            </Flex>
            <Flex>
              <CallToActionButton
                d={['none', 'none', 'none', 'none', 'flex', 'flex']}
              />
              <HamburgerMenu
                disclosure={mobileNavDisclosure}
                d={['flex', 'flex', 'flex', 'flex', 'none', 'none']}
              />
            </Flex>
          </Flex>
        </Flex>
        <MobileCollapseMenu disclosure={mobileNavDisclosure} />
      </Flex>
    </section>
  )
}
