// import App from "next/app";
import React, { useEffect } from 'react'
import { AppProps /* , AppContext */ } from 'next/app'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/styles/theme'
import { useRouter } from 'next/router'
import * as gtag from '@/utils/gtag'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/utils/api'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleRouteChange = (url: URL) => {
        gtag.pageview(url)
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
