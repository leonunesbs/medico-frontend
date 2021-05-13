import React from 'react'
import NextLink from 'next/link'
import { Flex, Text, Link, Wrap, WrapItem, IconButton } from '@chakra-ui/react'

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineWhatsApp
} from 'react-icons/ai'
import { FaTwitch } from 'react-icons/fa'

import { IFooter } from './Footer'

export const Footer: React.FC<IFooter.IProps> = ({
  socials: initialSocials
}) => {
  const icons: any = {
    facebook: <AiFillFacebook />,
    instagram: <AiFillInstagram />,
    twitter: <AiFillTwitterSquare />,
    github: <AiFillGithub />,
    linkedin: <AiFillLinkedin />,
    whatsapp: <AiOutlineWhatsApp />,
    twitch: <FaTwitch />
  }

  const socials = initialSocials.map((social: { name: string }) => ({
    ...social,
    icon: icons[social.name]
  }))
  return (
    <section id="footer">
      <Flex
        bgGradient="linear(to-b, brand.500 60%, brand.600)"
        boxShadow="inner"
        color="brand.100"
        transition="border-radius 0.4s"
        borderTopLeftRadius={['100px', '175px', '175px', '175px', '300px']}
        justify="center"
      >
        <Flex maxW="1280px" flexGrow={1} flexDir="row-reverse">
          <Flex
            flexGrow={1}
            flexDir="column"
            pr={[4, 4, 4, 4, 2]}
            py={6}
            transition="padding 0.4s"
            align="flex-end"
            textAlign="right"
          >
            <Text fontWeight="bold">Leonardo Nunes</Text>
            <Text>Generalista CRM-0000</Text>
            <Text>Rua Aristides Saraiva de Almeida, 960</Text>
            <Flex h="px" w="100%" mb={2} bgColor="brand.100" />
            <Wrap justify="center">
              {socials.map(
                (social: { id: any; name: string; url: string; icon: any }) => {
                  return (
                    <WrapItem key={social.id}>
                      <NextLink href={social.url} as={social.url} passHref>
                        <Link isExternal>
                          <IconButton
                            borderRadius="full"
                            aria-label={social.name}
                            icon={social.icon}
                            fontSize="3xl"
                            bgColor="transparent"
                            color="brand.100"
                            _hover={{
                              color: 'brand.700',
                              bgColor: 'transparent'
                            }}
                            _active={{
                              color: 'brand.500',
                              bgColor: 'brand.800'
                            }}
                          />
                        </Link>
                      </NextLink>
                    </WrapItem>
                  )
                }
              )}
            </Wrap>
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}
