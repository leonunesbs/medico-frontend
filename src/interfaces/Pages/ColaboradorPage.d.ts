import { FlexProps } from '@chakra-ui/react'

export declare namespace IColaboradorPage {
  interface IProps extends FlexProps {
    unidades: any
  }

  interface UnidadesProps {
    node: {
      id: string
      nome: string
      agendas: any
    }
  }
}
