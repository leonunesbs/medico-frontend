import { FlexProps } from '@chakra-ui/react'

export declare namespace IFooter {
  export interface IProps extends FlexProps {
    socials: ISocialsProps
  }

  export interface ISocialsProps {
    facebook: string
    instagram: string
    twitter: string
    github: string
    linkedin: string
    whatsapp: string
    twitch: string
  }
}
