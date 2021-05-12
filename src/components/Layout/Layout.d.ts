import { ReactNode } from 'react'
import { FlexProps } from '@chakra-ui/react'

export declare namespace ILayout {
  export interface IProps extends FlexProps {
    children: ReactNode
    isHeaded?: boolean
  }
}
