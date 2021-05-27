// #region Global Imports
import React from 'react'
import NextLink from 'next/link'

import { FaTwitch } from 'react-icons/fa'
import { Flex, Text, Link, Wrap, WrapItem, IconButton } from '@chakra-ui/react'

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineWhatsApp
} from 'react-icons/ai'

// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IFooter } from '@/interfaces'

// #endregion Interface Imports

export const Footer: React.FC<IFooter.IProps> = ({ socials: data }) => {
  const socials = [
    {
      id: 1,
      name: 'facebook',
      url: data.facebook,
      icon: <AiFillFacebook />
    },
    {
      id: 2,
      name: 'instagram',
      url: data.instagram,
      icon: <AiFillInstagram />
    },
    {
      id: 3,
      name: 'twitter',
      url: data.twitter,
      icon: <AiFillTwitterSquare />
    },
    {
      id: 4,
      name: 'github',
      url: data.github,
      icon: <AiFillGithub />
    },
    {
      id: 5,
      name: 'linkedin',
      url: data.linkedin,
      icon: <AiFillLinkedin />
    },
    {
      id: 6,
      name: 'whatsapp',
      url: data.whatsapp,
      icon: <AiOutlineWhatsApp />
    },
    {
      id: 7,
      name: 'twitch',
      url: data.twitch,
      icon: <FaTwitch />
    }
  ]
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
              {socials.map((social) => {
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
              })}
            </Wrap>
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}
