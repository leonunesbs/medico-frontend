// #region Global Imports
import React from 'react'
import NextImage from 'next/image'
import { Flex, Heading, Text } from '@chakra-ui/react'
// #endregion Global Imports

// #region Local Imports
import { CallToActionForm } from '@/components'

// #endregion Local Imports

// #region Interface Imports
import { ICallToAction } from '@/interfaces'

// #endregion Interface Imports

export const CallToAction: React.FC<ICallToAction.IProps> = () => {
  return (
    <Flex flexWrap="wrap-reverse" my={10} px={2}>
      <Flex
        flexDirection="column"
        w={['100%', '100%', '100%', '40%']}
        justify="center"
      >
        <Heading
          as="h1"
          fontWeight="black"
          size="3xl"
          isTruncated
          bgGradient="linear(to-br, brand.500,  brand.600)"
          bgClip="text"
          mb={10}
          p={1}
        >
          <Text as="span">OLÁ, VIDA</Text>
          <br />
          <Text as="span">SAUDÁVEL!</Text>
        </Heading>
        <Heading
          as="h2"
          fontWeight="regular"
          size="md"
          bgGradient="linear(to-br, brand.700,  brand.800)"
          bgClip="text"
          mb={10}
          p={1}
        >
          Cuidados médicos para você, junto à melhor experiência ao cuidar da
          sua saúde. Atendimento humanizado e a tecnologia em seu benefício.
        </Heading>
        <CallToActionForm />
      </Flex>
      <Flex
        w={['100%', '100%', '100%', '60%']}
        transition="width 0.4s"
        align="center"
        alignSelf="center"
        justify={['center', 'center', 'center', 'flex-end']}
      >
        <NextImage
          src="/esteto.png"
          alt="esteto"
          objectFit="contain"
          width="700px"
          height="420px"
        />
      </Flex>
    </Flex>
  )
}
