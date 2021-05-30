import { FlexProps } from '@chakra-ui/react'

export declare namespace IAgendaPage {
  interface IProps extends FlexProps {
    paciente: any
    consultas: any
    data: any
  }

  interface FormData {
    anamnese: string
    exameFisico: string
  }
}
