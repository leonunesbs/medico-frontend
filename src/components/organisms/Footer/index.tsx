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
import { useQuery } from 'react-query'
import { endpoint } from '@/services/api'
import request, { gql } from 'graphql-request'

// #endregion Interface Imports

const getSocials = function getSocials() {
  return useQuery('socials', async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          userByEmail(email: "leonunesbs@gmail.com") {
            social {
              whatsapp
              facebook
              instagram
              twitter
              linkedin
              github
              twitch
            }
          }
        }
      `
    ).then((data) => data)
    return data
  })
}

export const Footer: React.FC<IFooter.IProps> = () => {
  const { data: query } = getSocials()
  const data = query?.userByEmail.social

  const socials = [
    {
      id: 1,
      name: 'facebook',
      url: data?.facebook || 'https://facebook.com/',
      icon: <AiFillFacebook />
    },
    {
      id: 2,
      name: 'instagram',
      url: data?.instagram || 'https://instagram.com',
      icon: <AiFillInstagram />
    },
    {
      id: 3,
      name: 'twitter',
      url: data?.twitter || 'https://instagram.com',
      icon: <AiFillTwitterSquare />
    },
    {
      id: 4,
      name: 'github',
      url: data?.github || 'https://github.com',
      icon: <AiFillGithub />
    },
    {
      id: 5,
      name: 'linkedin',
      url: data?.linkedin || 'https://instagram.com',
      icon: <AiFillLinkedin />
    },
    {
      id: 6,
      name: 'whatsapp',
      url: data?.whatsapp || 'https://wa.me',
      icon: <AiOutlineWhatsApp />
    },
    {
      id: 7,
      name: 'twitch',
      url: data?.twitch || 'https://twitch.com',
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
        borderTopLeftRadius={['85px', '125px']}
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
