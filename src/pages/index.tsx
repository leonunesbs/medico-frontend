import React from 'react';
import { CallToActionButton, Layout } from '@/components';
import {
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import { AiOutlineMail } from 'react-icons/ai';
import { MdChevronRight } from 'react-icons/md';

export default function Home() {
  const ctaButtonText = useBreakpointValue({
    base: <Icon as={MdChevronRight} w={6} h={6} />,
    sm: 'Agendar consulta',
  });
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
              bgGradient="linear(to-br, brand.700,  brand.800)"
              bgClip="text"
              p={1}
            >
              Cuidados médicos para você, junto à melhor experiência ao cuidar
              da sua saúde. Atendimento humanizado e a tecnologia em seu
              benefício.
            </Heading>
            <Flex w="100%" h={2} my={4} />
            <form>
              <InputGroup borderRadius="full" boxShadow="base" size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  <Icon as={AiOutlineMail} w={6} h={6} />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  borderRadius="full"
                  color="brand.800"
                  focusBorderColor="brand.500"
                />
                <InputRightElement w="">
                  <CallToActionButton
                    type="submit"
                    size="lg"
                    w={['45px', '195px']}
                    transition="width 0.4s"
                    text={ctaButtonText}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          </Flex>
          <Flex
            w={['100%', '100%', '100%', '60%']}
            h={['340px', '520px']}
            transition="width 0.4s"
            align="center"
            alignSelf="center"
            justify="center"
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
