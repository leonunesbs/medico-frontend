import React from 'react'
import { IIDPacienteCard } from '@/interfaces'
import { Avatar, Circle, Flex, Heading, Text } from '@chakra-ui/react'

export const IdPacienteCard: React.FC<IIDPacienteCard.IProps> = ({
  paciente
}) => {
  return (
    <>
      <Flex flexDir="column" align="center">
        <Circle size="140px" p={1} bgColor="brand.500" mb={2}>
          <Avatar
            size="full"
            name="Ryan Florence"
            src="https://bit.ly/ryan-florence"
          />
        </Circle>
        <Heading
          as="h1"
          textAlign="center"
          bgGradient="linear(to-br, brand.500,  brand.600)"
          bgClip="text"
        >
          {paciente.nome}
        </Heading>
      </Flex>
      <Flex
        flexDir="column"
        boxShadow="base"
        borderRadius="md"
        p={4}
        my={4}
        mb={10}
      >
        <Text>Email: {paciente.user.email}</Text>
        <Text>Idade: {paciente.idade} anos</Text>
        <Text>
          Data de nascimento:{' '}
          {new Date(paciente.dataDeNascimento).toLocaleString('pt-BR', {
            timeZone: 'UTC',
            dateStyle: 'short'
          }) || 'Not found'}
        </Text>
        <Text>CPF: {paciente.cpf}</Text>
      </Flex>
    </>
  )
}
