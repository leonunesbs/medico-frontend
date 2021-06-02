import { WrapProps } from '@chakra-ui/react'

export declare namespace IConsultaTab {
  interface IProps extends WrapProps {
    consultas: any
    paciente: any
    consultaDisplayQtd: int
    setConsultaDisplayQtd: Dispatch<SetStateAction<number>>
  }
}
