// #region Global Imports
import React from 'react'
import { Button, Flex, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { BsArrowReturnRight } from 'react-icons/bs'
import NextLink from 'next/link'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IHeaderMenuItem } from '@/interfaces'
// #endregion Interface Imports

export const HeaderMenuItem: React.FunctionComponent<IHeaderMenuItem.IProps> = ({
  menuItem,
  // mobileIcon recebe de MobileCollapseMenu
  // para mostrar seta ao lado do item do menu
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
          color={menuItem.isActive ? 'brand.500' : 'brand.800'}
        />
      )}
      <NextLink href={menuItem.href} passHref>
        <LinkOverlay d="flex" alignItems="center">
          <Button
            isActive={menuItem.isActive}
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
            {menuItem.text}
          </Button>
        </LinkOverlay>
      </NextLink>
    </Flex>
  </LinkBox>
)
