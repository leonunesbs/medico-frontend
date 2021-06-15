import React, { useContext, useState, useEffect } from 'react'
import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { HiEye, HiEyeOff } from 'react-icons/hi'

import { CustomButton } from '@/components'
import { AuthContext } from '@/contexts/AuthContext'
import { ILoginForm } from '@/interfaces'

export function LoginForm({ ...rest }: ILoginForm.IProps) {
  const router = useRouter()
  const { isOpen, onToggle } = useDisclosure()
  const { signIn, isAuthenticated } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(3)

  const { register, handleSubmit } = useForm()

  const { next } = router.query

  const onSubmit = async (data: { email: string; password: string }) => {
    setError('')

    setLoading(true)

    signIn({
      email: data.email,
      password: data.password,
      redirectTo: next && `${next}`
    }).catch((request: any) => {
      setLoading(false)
      setError(request.response.errors[0].message)
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true)

      if (timeLeft === 0) {
        router.push(
          router.asPath === '/' ? '/login' : `/login?next=${router.asPath}`
        )
      }

      setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    }
  }, [timeLeft])
  return (
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
      {...rest}
    >
      {isAuthenticated ? (
        <Text textAlign="center" as="i">
          Autenticado. Você será redirecionado{' '}
          {timeLeft < 1 ? 'agora.' : `em ${timeLeft} segundos.`}
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
                  aria-label={isOpen ? 'Mask password' : 'Reveal password'}
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
            Ir para o início
          </Link>
        </NextLink>
      </Stack>
    </Stack>
  )
}
