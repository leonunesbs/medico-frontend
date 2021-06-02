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
      as="h2"
      textAlign="center"
      bgGradient="linear(to-br, brand.500,  brand.600)"
      bgClip="text"
      m={4}
      {...rest}
    >
      {children}
    </Heading>
  )
}
