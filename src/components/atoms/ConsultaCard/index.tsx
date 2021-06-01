import React from 'react'
import { FiTrash } from 'react-icons/fi'
import {
  Button,
  Collapse,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

interface IConsultaCard extends FlexProps {
  edge: {
    node: {
      id: string
      anamnese: string
      colaborador: { nome: string }
      dataConsulta: string
      exameFisico: string
    }
  }
}

export const ConsultaCard = ({ edge, ...rest }: IConsultaCard) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <Flex flexDir="column" boxShadow="base" borderRadius="md" {...rest}>
      <Button
        w="full"
        justifyContent="space-between"
        bgColor="transparent"
        flexWrap="wrap"
        _hover={{ bgColor: 'brand.700', color: 'brand.100' }}
        _active={{
          color: 'brand.100',
          bgGradient: 'linear(to-br, brand.500,  brand.600)',
          fontWeight: 'bold'
        }}
        _focus={{}}
        onClick={onToggle}
        isActive={isOpen}
      >
        <Text>
          {new Date(edge.node.dataConsulta).toLocaleString('pt-BR', {
            timeZone: 'UTC',
            dateStyle: 'short'
          })}
        </Text>
        <Text>{edge.node.colaborador.nome}</Text>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex flexDir="column" p={4}>
          <Stack>
            <Flex flexDir="column">
              <Text fontSize="sm" fontWeight="light">
                Anamnese
              </Text>
              <Text>{edge.node.anamnese}</Text>
            </Flex>
            <Flex flexDir="column">
              <Text fontSize="sm" fontWeight="light">
                Exame físico
              </Text>
              <Text>{edge.node.exameFisico}</Text>
            </Flex>
          </Stack>
          {/* <Stack isInline justify="flex-end">
            <IconButton
              size="sm"
              aria-label="remover"
              icon={<Icon as={FiTrash} w={4} h={4} />}
              bgColor="transparent"
              _hover={{ bgColor: 'brand.700', color: 'brand.100' }}
              _active={{ bgColor: 'brand.800', color: 'brand.500' }}
            />
          </Stack> */}
        </Flex>
      </Collapse>
    </Flex>
  )
}
