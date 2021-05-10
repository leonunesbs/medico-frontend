import React from 'react';
import { Layout } from '@/components';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Layout isHeaded>
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
              bgGradient="linear(to-br, brand.500,  brand.600)"
              bgClip="text"
              mb={10}
              p={1}
            >
              <Text as="span" textShadow="base">
                OLÁ, VIDA
              </Text>
              <br />
              <Text as="span">SAUDÁVEL!</Text>
            </Heading>
            <Heading
              as="h2"
              fontWeight="regular"
              size="md"
              bgGradient="linear(to-b, brand.700,  brand.800)"
              bgClip="text"
              p={1}
            >
              Cuidados médicos para todos, junto a uma experiência única ao
              cuidar da saúde. A parceria eficiente entre atendimento humanizado
              e tecnologia.
            </Heading>
          </Flex>
          <Flex
            w={['100%', '100%', '100%', '60%']}
            h={['340px', '520px']}
            transition="width 0.4s"
          >
            <Image
              src="/esteto.png"
              alt="esteto"
              fit="contain"
              transition="transform 0.2s ease-in"
            />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
