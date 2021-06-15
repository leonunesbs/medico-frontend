import { FlexProps } from '@chakra-ui/react'

export declare namespace IColaboradorPage {
  interface IProps extends FlexProps {
    unidades: {
      node: UnidadeProps
    }[]
  }

  interface UnidadeProps {
    id: string
    nome: string
    agendas: {
      edges: {
        node: AgendaProps
      }[]
    }
  }

  interface AgendaProps {
    id: string
    horario: string
  }
}
