// region GLOBAL
import React from 'react'
import { Heading, Flex } from '@chakra-ui/react'
import Image from 'next/image'

// endregion

// region LOCAL
import { ILoginPage } from '@/interfaces'
import { Layout, LoginForm } from '@/components'
// endregion

const LoginPage: React.FC<ILoginPage.IProps> = () => {
  return (
    <Layout isHeaded={false} isFootered={false} height="100vh">
      <Flex
        flexWrap="wrap"
        flexGrow={1}
        align={['initial', 'center']}
        justify="space-between"
        overflow="hidden"
      >
        <Flex
          h={['130px', '100%']}
          bgColor="brand.500"
          maxW={['100%', '50%']}
          flexGrow={1}
          align="center"
          p={[4, 10]}
        >
          <Heading as="h1" size="2xl" color="brand.100" fontWeight="black">
            Entrar na plataforma
          </Heading>
        </Flex>
        <Flex
          flexGrow={1}
          maxW={['100%', '40%']}
          h="100%"
          flexDirection="column"
          pt={4}
          justify={['initial', 'center']}
        >
          <Image
            src="/esteto.png"
            height="135px"
            width="135px"
            objectFit="contain"
          />
          <LoginForm />
        </Flex>
      </Flex>
    </Layout>
  )
}

export default LoginPage
