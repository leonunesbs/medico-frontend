import { FlexProps } from '@chakra-ui/react'

export declare namespace IFooter {
  export type IProps = FlexProps

  export interface ISocialsProps {
    userByEmail: {
      social: {
        facebook: string
        instagram: string
        twitter: string
        github: string
        linkedin: string
        whatsapp: string
        twitch: string
      }
    }
  }
}
