import { IColaboradorAgendaCollapse } from '@/interfaces'
import {
  Flex,
  Collapse,
  Text,
  Button,
  useOutsideClick,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import React, { useRef } from 'react'

export function ColaboradorAgendasCollapse({
  agendasCollapsed,
  onClose,
  ...rest
}: IColaboradorAgendaCollapse.IProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: cardRef,
    handler: () => onClose()
  })
  return (
    <Collapse animateOpacity {...rest}>
      <Flex
        ref={cardRef}
        mt={4}
        flexDir="column"
        p={4}
        boxShadow="base"
        rounded="md"
      >
        <Text fontSize="xs" textAlign="left" mb={1} color="brand.500">
          Escolha o horário
        </Text>
        <Wrap justify="center">
          {agendasCollapsed.map((agenda: any) => {
            return (
              <WrapItem key={agenda.id} flexGrow={1} maxW="70px">
                <Button
                  borderRadius="md"
                  flexDir="column"
                  h="40px"
                  w="full"
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
                >
                  <Text>
                    {new Date(agenda.horario).toLocaleTimeString('pt-BR', {
                      hour: '2-digit'
                    }).length < 2
                      ? `0${new Date(agenda.horario).toLocaleTimeString(
                          'pt-BR',
                          {
                            hour: '2-digit'
                          }
                        )}`
                      : new Date(agenda.horario).toLocaleTimeString('pt-BR', {
                          hour: '2-digit'
                        })}
                    h
                    {new Date(agenda.horario).toLocaleTimeString('pt-BR', {
                      minute: '2-digit'
                    }).length < 2
                      ? `0${new Date(agenda.horario).toLocaleTimeString(
                          'pt-BR',
                          {
                            minute: '2-digit'
                          }
                        )}`
                      : new Date(agenda.horario).toLocaleTimeString('pt-BR', {
                          minute: '2-digit'
                        })}
                  </Text>
                </Button>
              </WrapItem>
            )
          })}
        </Wrap>
      </Flex>
    </Collapse>
  )
}
