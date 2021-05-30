// #region Global Imports
import React, { useEffect, useState } from 'react'
import { Flex, ResponsiveValue } from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
import { Header, Footer, Fonts, Seo } from '@/components'
// #endregion Local Imports

// #region Interface Imports
import { ILayout } from '@/interfaces'
// #endregion Interface Imports

export const Layout: React.FunctionComponent<ILayout.IProps> = ({
  children,
  isHeaded = true,
  isFootered = true,
  height = '0px',
  ...rest
}: ILayout.IProps) => {
  const [animatedHeight, setAnimatedHeight] = useState<ResponsiveValue<any>>(
    '0px'
  )
  useEffect(() => {
    setAnimatedHeight(height)
  }, [height])
  return (
    <Flex
      id="layout"
      maxW="100vw"
      minH="100vh"
      flexDir="column"
      overflow="hidden"
      {...rest}
    >
      <Seo />
      <Fonts />
      <Flex
        flexDir="column"
        position={['fixed', 'initial']}
        w="100%"
        zIndex={50}
      >
        {isHeaded && <Header />}
      </Flex>
      {/* Gambiarra pro espaçamento do content */}
      <Header d={['initial', 'none']} visibility="hidden" />
      {/* FIM GAMBIRARRA */}
      <Flex align="center" justify="center" py={4}>
        <Flex
          maxW="1280px"
          flexGrow={1}
          transition="height 0.5s"
          h={animatedHeight}
          overflowY="auto"
        >
          {children}
        </Flex>
      </Flex>
      <Flex flexDir="column" w="100%" zIndex={40}>
        {isFootered && <Footer />}
      </Flex>
    </Flex>
  )
}
