import React from 'react';
import { Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IHeaderLogo } from './HeaderLogo';

export const HeaderLogo: React.FunctionComponent<IHeaderLogo.IProps> = ({
  disclosure,
  ...rest
}) => (
  <LinkBox>
    <NextLink href="/" as="/" passHref>
      <LinkOverlay>
        <Image
          src={`/images/logo-light${disclosure.isOpen ? '-h' : ''}.png`}
          objectFit="contain"
          transition="width 0.5s, height 0.5s"
          h={[
            `${disclosure.isOpen ? '70px' : '50px'}`,
            `${disclosure.isOpen ? '120px' : '80px'}`,
            '120px',
          ]}
          {...rest}
        />
      </LinkOverlay>
    </NextLink>
  </LinkBox>
);
