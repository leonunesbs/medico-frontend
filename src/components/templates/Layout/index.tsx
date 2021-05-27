// #region Global Imports
import React, { useEffect, useState } from 'react'
import { Flex, ResponsiveValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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
  socials,
  ...rest
}: ILayout.IProps) => {
  const router = useRouter()
  const [animatedHeight, setAnimatedHeight] = useState<ResponsiveValue<any>>(
    '700px'
  )

  const pageHeights = [
    {
      pahtname: '/',
      height: ['700px', '800px', '800px', '600px']
    },
    {
      pahtname: '/agenda',
      height: '200px'
    }
  ]

  useEffect(() => {
    pageHeights.map(
      (page) =>
        page.pahtname === router.pathname && setAnimatedHeight(page.height)
    )
  }, [router.pathname])
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
      {isHeaded && <Header />}
      <Flex align="center" justify="center">
        <Flex
          maxW="1280px"
          flexGrow={1}
          transition="height 0.3s, transform 0.3s"
          h={animatedHeight}
        >
          {children}
        </Flex>
      </Flex>
      {isFootered && <Footer socials={socials} />}
    </Flex>
  )
}
