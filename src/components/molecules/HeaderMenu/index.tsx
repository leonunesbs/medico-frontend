// #region Global Imports
import React from 'react'
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { HeaderMenuItem } from '@/components'
import { IHeaderMenu } from '@/interfaces'
// #endregion Interface Imports

export const HeaderMenu: React.FunctionComponent<IHeaderMenu.IProps> = ({
  // mobileIcon recebe de MobileCollapseMenu
  // para mostrar seta ao lado do item do menu
  mobileIcon,
  disclosure,
  ...rest
}: IHeaderMenu.IProps) => {
  const router = useRouter()

  const menuItems: IHeaderMenu.IMenuItemProps[] = [
    {
      text: 'Início',
      isActive: false,
      href: '/'
    },
    {
      text: 'Agenda',
      isActive: false,
      href: '/agenda'
    },
    {
      text: 'Especialidades',
      isActive: false,
      href: '/especialidades'
    },
    {
      text: 'Procedimentos',
      isActive: false,
      href: '/procedimentos'
    }
  ]

  return (
    <Flex {...rest}>
      {menuItems.map((menuItem) => (
        <HeaderMenuItem
          key={menuItem.text}
          menuItem={menuItem}
          mobileIcon={mobileIcon}
          isActive={router.pathname === menuItem.href}
          onClick={disclosure?.onClose}
        />
      ))}
    </Flex>
  )
}
