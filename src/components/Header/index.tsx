// #region Global Imports
import { Flex, Image, useDisclosure } from '@chakra-ui/react';
import {
  CallToActionButton,
  HamburgerMenu,
  HeaderMenu,
  MobileCollapseMenu,
} from '@/components';
import React from 'react';
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IHeader } from './Header';
// #endregion Interface Imports

export const Header: React.FunctionComponent<IHeader.IProps> = ({
  ...rest
}: IHeader.IProps) => {
  const mobileNavDisclosure = useDisclosure();
  return (
    <section id="header">
      <Flex bgColor="brand.100" boxShadow="base" flexDir="column">
        <Flex justify="center" px={4} py={2} {...rest}>
          <Flex
            flexGrow={1}
            align="center"
            justify="space-between"
            maxW="1280px"
          >
            <Flex
              transition="width 0.2s, height 0.2s"
              h={[`50px`, `60px`, `80px`, `100px`, `120px`]}
              minW="100px"
            >
              <Image
                d={[`none`, `flex`]}
                src="/images/logo-light-h.png"
                objectFit="contain"
              />
              <Image
                d={[`flex`, `none`]}
                src="/images/logo-light.png"
                objectFit="contain"
              />
            </Flex>
            <Flex>
              <HeaderMenu />
            </Flex>
            <Flex>
              <CallToActionButton
                d={[`none`, `none`, `none`, `none`, `flex`, `flex`]}
              />
              <HamburgerMenu
                disclosure={mobileNavDisclosure}
                d={[`flex`, `flex`, `flex`, `flex`, `none`, `none`]}
              />
            </Flex>
          </Flex>
        </Flex>
        <MobileCollapseMenu disclosure={mobileNavDisclosure} />
      </Flex>
    </section>
  );
};
