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
  ...rest
}: IHeaderMenu.IProps) => (
  <section id="headerMenu">
    <>
      <Flex d={[`none`, `none`, `none`, `none`, `flex`]} {...rest}>
        <HeaderMenuItem text="Início" />
        <HeaderMenuItem text="Agenda" />
        <HeaderMenuItem text="Especialidades" />
        <HeaderMenuItem text="Procedimentos" />
      </Flex>
    </>
  </section>
);
