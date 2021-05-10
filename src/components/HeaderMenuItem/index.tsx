// #region Global Imports
import React from 'react';
import { Button, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react';
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

// #region Interface Imports
import { IHeaderMenuItem } from './HeaderMenuItem';
// #endregion Interface Imports

export const HeaderMenuItem: React.FunctionComponent<IHeaderMenuItem.IProps> = ({
  text,
  ...rest
}: IHeaderMenuItem.IProps) => (
  <section id={`headerMenuItem_${text}`}>
    <LinkBox>
      <Flex align="center" justify="center" p={2}>
        <LinkOverlay
          _hover={{ textDecoration: `none` }}
          flexDir="column"
          d="flex"
          alignItems="center"
        >
          <Button
            borderRadius="full"
            bgColor="transparent"
            color="brand.700"
            fontWeight="regular"
            _hover={{
              bgColor: `transparent`,
              color: `brand.500`,
              fontWeight: `medium`,
            }}
            _active={{
              bgColor: `transparent`,
              color: `brand.500`,
              fontWeight: `bold`,
            }}
            {...rest}
          >
            {text}
          </Button>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  </section>
);
