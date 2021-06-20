import {
  ColaboradorAgendasCard,
  ColaboradorAgendasCollapse,
  GradientHeading
} from '@/components'
import { IColaboradorUnidades } from '@/interfaces'
import { dynamicSortNode } from '@/utils/dynamicSort'
import { Flex, Text, useDisclosure, Stack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'

export function ColaboradorUnidades({ unidade }: IColaboradorUnidades.IProps) {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const agendas = unidade.agendas.edges.sort(dynamicSortNode('horario'))

  const [agendasCollapsed, setAgendasCollapsed] = useState([])

  const groups = agendas.reduce((groups: any, { node }: any) => {
    const date = node.horario.split('T')[0]
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(node)
    return groups
  }, {})

  // Edit: to add it in the array format instead
  const groupDates = Object.keys(groups).map((date) => {
    return {
      date,
      agendas: groups[date]
    }
  })

  const handleAgendasCollapse = useCallback((data) => {
    if (isOpen) {
      onClose()
      setAgendasCollapsed(data)
      setTimeout(() => {
        onOpen()
      }, 125)
    } else {
      setAgendasCollapsed(data)
      onOpen()
    }
  }, [])

  return (
    <Flex flexDir="column" mb={4}>
      <GradientHeading
        as="h3"
        size="sm"
        textAlign="left"
        fontWeight="semibold"
        mb={2}
      >
        <Text
          as="span"
          fontWeight="normal"
          fontSize="sm"
          textColor="brand.700"
          color="brand.700"
        >
          Unidade:{' '}
        </Text>
        {unidade.nome}
      </GradientHeading>
      <Stack isInline>
        {groupDates.map((groupDates) => {
          return (
            <ColaboradorAgendasCard
              key={groupDates.date}
              groupDates={groupDates}
              handleAgendasCollapse={handleAgendasCollapse}
            />
          )
        })}
      </Stack>
      <ColaboradorAgendasCollapse
        in={isOpen}
        agendasCollapsed={agendasCollapsed}
        onClose={onClose}
      />
    </Flex>
  )
}
