import { FlexProps, UseDisclosureProps } from '@chakra-ui/react'

export declare namespace IHeaderMenu {
  export interface IProps extends FlexProps {
    mobileIcon?: boolean
    disclosure?: UseDisclosureProps
  }

  export type IMenuItemProps = {
    text: string
    isActive: boolean
    href: string
  }
}
