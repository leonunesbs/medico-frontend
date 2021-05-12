import React from 'react'
import NextImage from 'next/image'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { ICallToAction } from './CallToAction'
import { CallToActionForm } from '@/components'

export const CallToAction: React.FC<ICallToAction.IProps> = () => {
  return (
    <Flex align="center" justify="center" py={[0, 20]}>
      <Flex flexWrap="wrap-reverse" maxW="1280px" flexGrow={1} p={4}>
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
          h={['340px', '520px']}
          transition="width 0.4s"
          align="center"
          alignSelf="center"
          justify="center"
        >
          <NextImage
            src="/esteto.png"
            alt="esteto"
            objectFit="contain"
            width={800}
            height={800}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
