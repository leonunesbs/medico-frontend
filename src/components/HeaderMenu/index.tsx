// #region Global Imports
import React from 'react';
import { Flex } from '@chakra-ui/react';
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { HeaderMenuItem } from '@/components';
import { IHeaderMenu } from './HeaderMenu';
// #endregion Interface Imports

export const HeaderMenu: React.FunctionComponent<IHeaderMenu.IProps> = ({
  mobileIcon,
  disclosure,
  ...rest
}: IHeaderMenu.IProps) => {
  const menuItems = [
    {
      text: 'Início',
      isActive: true,
    },
    {
      text: 'Agenda',
      isActive: false,
    },
    {
      text: 'Especialidades',
      isActive: false,
    },
    {
      text: 'Procedimentos',
      isActive: false,
    },
  ];

  return (
    <Flex {...rest}>
      {menuItems.map((item) => (
        <HeaderMenuItem
          key={item.text}
          text={item.text}
          isActive={item.isActive}
          mobileIcon={mobileIcon}
          onClick={disclosure?.onClose}
        />
      ))}
    </Flex>
  );
};
