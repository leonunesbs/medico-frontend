import React, { useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'

import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { CustomButton } from '@/components'
import { AuthContext } from '@/contexts/AuthContext'
import { ISignInHeaderButton } from '@/interfaces'

export function SignInHeaderButton({ ...rest }: ISignInHeaderButton.IProps) {
  const router = useRouter()
  const [fullW, setFullW] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, signOut } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()
  return (
    <Flex align="center" justify="center" {...rest}>
      <IconButton
        bgColor={'transparent'}
        borderRadius="full"
        p={0}
        aria-label={isAuthenticated ? 'Sair' : 'Entrar'}
        color="brand.500"
        _active={{}}
        _hover={{ color: 'brand.600' }}
        isLoading={loading}
        onMouseLeave={() => setFullW(false)}
        onMouseEnter={() => setFullW(true)}
        icon={
          <Flex
            w={fullW ? '90px' : '25px'}
            transition="width 0.3s"
            justify="space-evenly"
          >
            {isAuthenticated ? (
              <Icon as={AiOutlineLogout} w={6} h={6} borderRadius="full" />
            ) : (
              <Icon as={AiOutlineLogin} w={6} h={6} borderRadius="full" />
            )}
            <Flex d={fullW ? 'flex' : 'none'} align="center">
              {isAuthenticated ? <Text>Sair</Text> : <Text>Entrar</Text>}
            </Flex>
          </Flex>
        }
        onClick={() => {
          if (isAuthenticated) {
            setLoading(true)
            onOpen()
            setLoading(false)
          } else {
            setLoading(true)
            router.push(
              router.asPath === '/' ? '/login' : `/login?next=${router.asPath}`
            )
          }
        }}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Sair?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Stack isInline justify="flex-end">
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose()
                }}
                bgColor="brand.700"
                color="brand.100"
                borderRadius="full"
                _active={{ bgColor: 'brand.800', color: 'brand.500' }}
                _hover={{ bgColor: 'brand.800' }}
              >
                Cancelar
              </Button>
              <CustomButton
                onClick={() => {
                  onClose()
                  signOut(
                    router.asPath === '/'
                      ? '/login'
                      : `/login?next=${router.asPath}`
                  )
                }}
              >
                Sair
              </CustomButton>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  )
}
