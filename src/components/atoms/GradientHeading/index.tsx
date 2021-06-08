import { Heading, HeadingProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface GradientHeadingProps extends HeadingProps {
  children: ReactNode
}

export const GradientHeading = ({
  children,
  ...rest
}: GradientHeadingProps) => {
  return (
    <Heading
      textAlign="center"
      bgGradient="linear(to-br, brand.500,  brand.600)"
      bgClip="text"
      {...rest}
    >
      {children}
    </Heading>
  )
}
