// #region Global Imports
import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Header } from '@/components'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { ILayout } from './Layout'
// #endregion Interface Imports

export const Layout: React.FunctionComponent<ILayout.IProps> = ({
  children,
  isHeaded,
  ...rest
}: ILayout.IProps) => (
  <Flex id="layout" w="100vw" minH="100vh" flexDir="column" {...rest}>
    {isHeaded && <Header />}
    {children}
  </Flex>
)
