// #region Global Imports
import React from 'react'
import { Flex } from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
import { Header, Footer, Fonts } from '@/components'
// #endregion Local Imports

// #region Interface Imports
import { ILayout } from '../MobileCollapseMenu/Layout'
import { Seo } from '../Seo'
// #endregion Interface Imports

export const Layout: React.FunctionComponent<ILayout.IProps> = ({
  children,
  isHeaded = true,
  isFootered = true,
  socials,
  ...rest
}: ILayout.IProps) => (
  <Flex
    id="layout"
    maxW="100vw"
    minH="100vh"
    flexDir="column"
    overflow="hidden"
    {...rest}
  >
    <Fonts />
    {isHeaded && <Header />}
    {children}
    {isFootered && <Footer socials={socials} />}
  </Flex>
)
