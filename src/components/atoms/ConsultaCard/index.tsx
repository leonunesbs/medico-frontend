import React from 'react'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  FlexProps,
  Text
} from '@chakra-ui/react'
import MDEditor from '@uiw/react-md-editor'

interface IConsultaCard extends FlexProps {
  edge: {
    node: {
      id: string
      consulta: string
      colaborador: { nome: string }
      dataConsulta: string
    }
  }
}

export const ConsultaCard = ({ edge, ...rest }: IConsultaCard) => {
  return (
    <AccordionItem
      flexDir="column"
      boxShadow="base"
      borderRadius="md"
      {...rest}
    >
      <AccordionButton
        w="full"
        justifyContent="space-between"
        bgColor="transparent"
        flexWrap="wrap"
        _hover={{ bgColor: 'brand.700', color: 'brand.100' }}
        _expanded={{
          color: 'brand.100',
          bgGradient: 'linear(to-br, brand.500,  brand.600)',
          fontWeight: 'bold'
        }}
        _focus={{ bgColor: 'brand.700', color: 'brand.100' }}
        borderRadius="md"
      >
        <Text>
          {new Date(edge.node.dataConsulta).toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            dateStyle: 'long'
          })}
        </Text>
        <Text>{edge.node.colaborador.nome}</Text>
      </AccordionButton>
      <AccordionPanel>
        <MDEditor.Markdown source={edge.node.consulta} />
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
      </AccordionPanel>
    </AccordionItem>
  )
}
