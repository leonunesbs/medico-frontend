import { GradientHeading } from '@/components'
import { ColaboradorUnidades } from '@/components/molecules'
import { IColaboradorProps } from '@/interfaces'
import { Avatar, Circle, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export function Colaborador({ unidades }: IColaboradorProps.IProps) {
  return (
    <Flex
      flexWrap="wrap"
      p={2}
      justify={['center', 'center', 'center', 'space-between']}
      maxH="240px"
    >
      <Circle
        size={['240px', '360px']}
        p={1}
        bgGradient="linear(to-br, brand.500,  brand.600)"
        m={4}
      >
        <Avatar
          size="full"
          name="Ryan Florence"
          src="https://bit.ly/ryan-florence"
        />
      </Circle>
      <Flex
        flexDir="column"
        alignSelf="flex-start"
        maxW={['100%', '100%', '100%', '60%']}
      >
        <Flex flexDir="column" boxShadow="base" borderRadius="md" p={2}>
          <GradientHeading as="h1" textAlign="left">
            Leonardo Nunes
          </GradientHeading>
          <Text as="h2" fontWeight="semibold" lineHeight={0.8} mb={4}>
            Generalista
          </Text>
          <Text textAlign="justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </Flex>

        <Flex p={4} boxShadow="base" flexDir="column" borderRadius="md" mt={4}>
          <GradientHeading size="md" textAlign="left">
            Agenda
          </GradientHeading>
          <Flex flexDir="column">
            {unidades.map(({ node: unidade }: any) => {
              return <ColaboradorUnidades unidade={unidade} />
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
