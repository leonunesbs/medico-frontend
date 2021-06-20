import { ColaboradorUnidades, GradientHeading } from '@/components'
import { IColaboradorComponentProps } from '@/interfaces'
import { Avatar, Circle, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export function ColaboradorComponent({
  unidades,
  colaborador
}: IColaboradorComponentProps.IProps) {
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
            {colaborador.nome}
          </GradientHeading>
          <Text as="h2" fontWeight="semibold" lineHeight={0.8} mb={4}>
            {colaborador.ocupacao}
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
          <Flex flexDir="column" mt={4}>
            {unidades.map(({ node: unidade }) => {
              if (unidade.agendas.edges.length < 1) {
                return (
                  <Text as="i">
                    Não há agendas em {unidade.nome} para os próximos dias.
                  </Text>
                )
              } else {
                return (
                  <ColaboradorUnidades key={unidade.id} unidade={unidade} />
                )
              }
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
