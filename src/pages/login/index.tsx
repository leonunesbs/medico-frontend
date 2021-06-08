// region GLOBAL
import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  Flex,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
import Image from 'next/image'

import { HiEye, HiEyeOff } from 'react-icons/hi'
// endregion

// region LOCAL
import { ILoginPage } from '@/interfaces'
import { CustomButton, Layout } from '@/components'
import { AuthContext } from '@/context/AuthContext'
import Router from 'next/router'
// endregion

const LoginPage: React.FC<ILoginPage.IProps> = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { signIn, isAuthenticated } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: { email: string; password: string }) => {
    setError('')
    setLoading(true)
    await signIn({
      email: data.email,
      password: data.password
    }).catch((request) => {
      setLoading(false)
      setError(request.response.errors[0].message)
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      setTimeout(() => Router.push('/'), 3000)
    }
  }, [isAuthenticated])

  return (
    <Layout isHeaded={false} isFootered={false} height="100vh">
      <Flex
        flexWrap="wrap"
        flexGrow={1}
        align={['initial', 'center']}
        justify="space-between"
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
          <Stack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            boxShadow="base"
            borderRadius="md"
            transition="height 0.3s"
            justify="center"
            m={[4, 4, 10]}
            p={4}
            spacing={6}
          >
            {isAuthenticated ? (
              <Text textAlign="center" as="i">
                Autenticado. Você será redirecionado em poucos segundos.
              </Text>
            ) : (
              <>
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
                    placeholder="Digite seu email"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel
                    color="brand.700"
                    d="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <Text>Senha</Text>
                    <NextLink passHref href="/forgot-password">
                      <Link
                        color="brand.500"
                        _hover={{ color: 'brand.600' }}
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
                      placeholder="Digite sua senha"
                    />
                    <InputRightElement>
                      <IconButton
                        bg="transparent !important"
                        variant="ghost"
                        _focus={{}}
                        aria-label={
                          isOpen ? 'Mask password' : 'Reveal password'
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onToggle}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </>
            )}
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Stack flexGrow={1} flexDirection="column">
              <CustomButton type="submit" size="lg" isLoading={loading}>
                Entrar
              </CustomButton>
              <NextLink passHref href="/">
                <Link
                  color="brand.500"
                  _hover={{ color: 'brand.600' }}
                  _active={{ color: 'brand.800' }}
                  textAlign="center"
                >
                  Voltar
                </Link>
              </NextLink>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default LoginPage
