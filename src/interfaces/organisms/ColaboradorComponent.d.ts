import { FlexProps } from '@chakra-ui/react'
import { IColaboradorPage } from '../Pages/ColaboradorPage'

export declare namespace IColaboradorComponentProps {
  interface IProps extends FlexProps {
    unidades: {
      node: IColaboradorPage.UnidadeProps
    }[]
  }
}
