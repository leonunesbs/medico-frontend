import { FlexProps } from '@chakra-ui/react'
import { IColaboradorPage } from './ColaboradorPage'

export declare namespace IAgendaPage {
  interface IProps extends FlexProps {
    paciente: any
    consultas: any
    data: any
    colaboradores: {
      node: IColaboradorPage.ColaboradorProps
    }[]
  }
}
