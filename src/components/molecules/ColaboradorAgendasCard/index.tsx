import { IColaboradorAgendasCard } from '@/interfaces/molecules/ColaboradorAgendasCard'
import { Button, Text } from '@chakra-ui/react'
import React from 'react'

export function ColaboradorAgendasCard({
  groupDates,
  handleAgendasCollapse
}: IColaboradorAgendasCard.IProps) {
  return (
    <Button
      onClick={() => handleAgendasCollapse(groupDates.agendas)}
      borderRadius="md"
      flexDir="column"
      h="70px"
      w="90px"
      bgColor="brand.100"
      boxShadow="base"
      _hover={{
        backgroundColor: 'brand.500',
        color: 'brand.100'
      }}
      _active={{
        backgroundColor: 'brand.600',
        color: 'brand.100'
      }}
      _focus={{}}
      // isActive={id === activeId}
    >
      <Text>{new Date(groupDates.date).getDate()}</Text>
      <Text>
        {new Date(groupDates.date).toLocaleDateString('pt-BR', {
          month: 'long'
        })}
      </Text>
      <Text>
        {new Date(groupDates.date).toLocaleDateString('pt-BR', {
          year: 'numeric'
        })}
      </Text>
    </Button>
  )
}
