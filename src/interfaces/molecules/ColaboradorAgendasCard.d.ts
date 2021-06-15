import { ButtonProps } from '@chakra-ui/react'
import { IColaboradorPage } from '../Pages/ColaboradorPage'

export declare namespace IColaboradorAgendasCard {
  interface IProps extends ButtonProps {
    groupDates: {
      date: string
      agendas: {
        edges: {
          node: IColaboradorPage.AgendaProps
        }[]
      }
    }
    handleAgendasCollapse: (agendas: {
      edges: { node: IColaboradorPage.AgendaProps }[]
    }) => void
  }
}
