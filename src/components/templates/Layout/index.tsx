// #region Global Imports
import React, { useContext, useEffect, useState } from 'react'
import { Flex, ResponsiveValue } from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
import { Header, Footer, Fonts, Seo } from '@/components'
// #endregion Local Imports

// #region Interface Imports
import { ILayout } from '@/interfaces'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
// #endregion Interface Imports

export const Layout: React.FunctionComponent<ILayout.IProps> = ({
  children,
  isTokenExpirable = true,
  isHeaded = true,
  isFootered = true,
  height = '0px',
  ...rest
}: ILayout.IProps) => {
  const { payload, signOut } = useContext(AuthContext)

  const router = useRouter()

  const [animatedHeight, setAnimatedHeight] = useState<ResponsiveValue<any>>(
    '0px'
  )
  useEffect(() => {
    setAnimatedHeight(height)
  }, [height])

  useEffect(() => {
    if (payload && isTokenExpirable) {
      if (new Date(payload.exp * 1000).getTime() < new Date().getTime()) {
        alert('Sua sessão expirou!')
        signOut(`/login?next=${router.asPath}`)
      }
    }
  }, [])

  return (
    <Flex id="layout" flexDir="column" overflow="hidden" {...rest}>
      <Seo />
      <Fonts />
      {isHeaded && (
        <>
          <Flex
            flexDir="column"
            position={['fixed', 'initial']}
            w="100%"
            zIndex={50}
          >
            <Header />
          </Flex>
          <Header d={['initial', 'none']} visibility="hidden" />
        </>
      )}
      <Flex align="center" justify="center">
        <Flex
          maxW="1280px"
          flexGrow={1}
          transition="height 1s"
          h={animatedHeight}
          overflowY="auto"
        >
          {children}
        </Flex>
      </Flex>
      {isFootered && (
        <Flex flexDir="column" w="100%" zIndex={40}>
          <Footer />
        </Flex>
      )}
    </Flex>
  )
}
