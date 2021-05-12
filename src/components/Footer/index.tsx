import React from 'react'
import NextLink from 'next/link'
import {
  Flex,
  Text,
  Link,
  LinkBox,
  LinkOverlay,
  Wrap,
  WrapItem,
  IconButton
} from '@chakra-ui/react'

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
    <Flex
      bgGradient="linear(to-b, brand.500 60%, brand.600)"
      flexDir="column"
      color="brand.100"
      transition="border-radius 0.4s"
      borderTopLeftRadius={['175px', '175px', '175px', '175px', '300px']}
    >
      <Flex
        w="100%"
        maxW="1280px"
        minH="175px"
        alignSelf="center"
        p={10}
        fontWeight="semibold"
        align="flex-end"
        flexDir="column"
      >
        <NextLink href="https://blog.leonunesbs.com.br" passHref>
          <Link _hover={{ color: 'brand.700' }}>
            <Text>Blog</Text>
          </Link>
        </NextLink>
        <NextLink href="/sobre">
          <Link _hover={{ color: 'brand.700' }}>
            <Text>Sobre</Text>
          </Link>
        </NextLink>
        <Flex h="px" my={2} w="175px" maxW="90%" bgColor="brand.100" />
        <Wrap justify="center">
          {socials.map(
            (social: { id: number; name: string; url: string; icon: any }) => {
              return (
                <WrapItem key={social.id}>
                  <LinkBox>
                    <LinkOverlay
                      isExternal
                      name={social.name}
                      href={social.url}
                    >
                      <IconButton
                        aria-label={social.name}
                        icon={social.icon}
                        fontSize="3xl"
                        bgColor="transparent"
                        color="brand.200"
                        _hover={{ bgColor: 'transparent', color: 'brand.700' }}
                      />
                    </LinkOverlay>
                  </LinkBox>
                </WrapItem>
              )
            }
          )}
        </Wrap>
      </Flex>
    </Flex>
  )
}
