import { Heading } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface GradientHeadingProps {
  children: ReactNode
  size: string | string[]
}

export const GradientHeading = ({ children }: GradientHeadingProps) => {
  return (
    <Heading
      as="h2"
      size="sm"
      textAlign="center"
      bgGradient="linear(to-br, brand.500,  brand.600)"
      bgClip="text"
    >
      {children}
    </Heading>
  )
}
