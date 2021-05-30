import { Button, ButtonProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface CustomButtonProps extends ButtonProps {
  children: ReactNode
}

export const CustomButton = ({ children, ...rest }: CustomButtonProps) => {
  return (
    <Button
      bgColor="brand.500"
      color="brand.100"
      borderRadius="full"
      fontWeight="bold"
      _active={{ bgColor: 'brand.800', color: 'brand.500' }}
      _hover={{ bgColor: 'brand.700' }}
      {...rest}
    >
      {children}
    </Button>
  )
}
