// #region Global Imports
import React from 'react'
import { Button, Flex, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { BsArrowReturnRight } from 'react-icons/bs'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IHeaderMenuItem } from './HeaderMenuItem'
// #endregion Interface Imports

export const HeaderMenuItem: React.FunctionComponent<IHeaderMenuItem.IProps> = ({
  text,
  isActive,
  mobileIcon,
  ...rest
}: IHeaderMenuItem.IProps) => (
  <LinkBox>
    <Flex align="center" justify="center" p={2}>
      {mobileIcon && (
        <Icon
          as={BsArrowReturnRight}
          w={6}
          h={4}
          mx={1}
          color={isActive ? 'brand.500' : 'brand.800'}
        />
      )}
      <LinkOverlay d="flex" alignItems="center">
        <Button
          isActive={isActive}
          transition="color 0.5s"
          borderRadius="full"
          bgColor="transparent"
          color="brand.700"
          fontWeight="regular"
          _hover={{
            bgColor: 'transparent',
            color: 'brand.800',
            fontWeight: 'semibold'
          }}
          _active={{
            bgColor: 'transparent',
            color: 'brand.500',
            fontWeight: 'bold'
          }}
          {...rest}
        >
          {text}
        </Button>
      </LinkOverlay>
    </Flex>
  </LinkBox>
)
