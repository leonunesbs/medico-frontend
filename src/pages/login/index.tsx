// region GLOBAL
import React, { useContext, useState } from 'react'
import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
import { parseCookies } from 'nookies'

import { HiEye, HiEyeOff } from 'react-icons/hi'
// endregion

// region LOCAL
import { ILoginPage } from '@/interfaces'
import { CustomButton, Layout } from '@/components'
import { GetServerSideProps } from 'next'
import { AuthContext } from '@/context/AuthContext'
// endregion

const LoginPage: React.FC<ILoginPage.IProps> = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { signIn } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    await signIn({ email: data.email, password: data.password })
  }

  return (
    <Layout isHeaded={false} isFootered={false} height="100vh">
      <Flex flexWrap="wrap" flexGrow={1} justify="space-between">
        <Flex
          h="100vh"
          bgColor="brand.500"
          p={4}
          flexGrow={1}
          maxW={['initial', 'initial', '50%']}
          minH="120px"
          maxH={['10%', '10%', 'initial']}
        >
          <Heading as="h1" size="2xl" color="brand.100" alignSelf="center">
            Fazer login na plataforma
          </Heading>
        </Flex>
        <Stack
          as="form"
          alignSelf={['initial', 'initial', 'center']}
          flexGrow={1}
          maxW={['initial', 'initial', '540px']}
          spacing={6}
          onSubmit={handleSubmit(onSubmit)}
          p={4}
        >
          <FormControl id="email">
            <FormLabel color="brand.700">Email</FormLabel>
            <Input
              {...register('email')}
              boxShadow="base"
              name="email"
              type="email"
              autoComplete="email"
              required
              focusBorderColor="brand.500"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel
              color="brand.700"
              d="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Text>Senha</Text>
              <NextLink passHref href="/forgot-password">
                <Link
                  color="brand.500"
                  _hover={{ color: 'brand.700' }}
                  _active={{ color: 'brand.800' }}
                  fontSize="xs"
                  textAlign="right"
                >
                  Esqueceu sua senha?
                </Link>
              </NextLink>
            </FormLabel>
            <InputGroup>
              <Input
                {...register('password')}
                type={isOpen ? 'text' : 'password'}
                boxShadow="base"
                name="password"
                autoComplete="password"
                required
                focusBorderColor="brand.500"
              />
              <InputRightElement>
                <IconButton
                  bg="transparent !important"
                  variant="ghost"
                  _focus={{}}
                  aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                  icon={isOpen ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggle}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <CustomButton type="submit" size="lg" isLoading={loading}>
            Entrar
          </CustomButton>
        </Stack>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'medico:token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default LoginPage
