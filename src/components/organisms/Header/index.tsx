// #region Global Imports
import React, { useContext, useRef, useState } from 'react'
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
  useDisclosure,
  useOutsideClick
} from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
import {
  CallToActionButton,
  HamburgerMenu,
  HeaderMenu,
  HeaderLogo,
  MobileCollapseMenu,
  CustomButton
} from '@/components'
// #endregion Local Imports

// #region Interface Imports
import { IHeader } from '@/interfaces'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import Router from 'next/router'
import { AuthContext } from '@/context/AuthContext'
// #endregion Interface Imports

export const Header: React.FunctionComponent<IHeader.IProps> = ({
  ...rest
}: IHeader.IProps) => {
  const mobileNavDisclosure = useDisclosure()
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, signOut } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()
  const headerRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: headerRef,
    handler: () => mobileNavDisclosure.onClose()
  })
  return (
    <section id="header">
      <Flex
        ref={headerRef}
        bgColor="brand.100"
        boxShadow="base"
        flexDir="column"
        {...rest}
      >
        <Flex justify="center" p={2}>
          <Flex
            flexGrow={1}
            align="center"
            justify="space-between"
            maxW="1280px"
          >
            <Flex>
              <HeaderLogo disclosure={mobileNavDisclosure} />
            </Flex>
            <Flex>
              <HeaderMenu d={['none', 'none', 'none', 'none', 'flex']} />
            </Flex>
            <Stack isInline>
              <Flex align="center" justify="center">
                <IconButton
                  bgColor={'transparent'}
                  borderRadius="full"
                  p={0}
                  transition="background 0.2s ease-in"
                  aria-label={isAuthenticated ? 'Sair' : 'Entrar'}
                  color="brand.500"
                  _active={{}}
                  _hover={{ color: 'brand.600' }}
                  isLoading={loading}
                  icon={
                    isAuthenticated ? (
                      <Icon
                        as={AiOutlineLogout}
                        w={6}
                        h={6}
                        borderRadius="full"
                      />
                    ) : (
                      <Icon
                        as={AiOutlineLogin}
                        w={6}
                        h={6}
                        borderRadius="full"
                      />
                    )
                  }
                  onClick={() => {
                    if (isAuthenticated) {
                      setLoading(true)
                      onOpen()
                      setLoading(false)
                    } else {
                      setLoading(true)
                      Router.push('/login')
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
                            signOut()
                            onClose()
                          }}
                        >
                          Sair
                        </CustomButton>
                      </Stack>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Flex>
              <CallToActionButton
                d={['none', 'none', 'none', 'none', 'flex', 'flex']}
              />
              <HamburgerMenu
                disclosure={mobileNavDisclosure}
                d={['flex', 'flex', 'flex', 'flex', 'none', 'none']}
              />
            </Stack>
          </Flex>
        </Flex>
        <MobileCollapseMenu disclosure={mobileNavDisclosure} />
      </Flex>
    </section>
  )
}
