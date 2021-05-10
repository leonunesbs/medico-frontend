import { FlexProps, UseDisclosureProps } from '@chakra-ui/react';

export declare namespace IHamburgerMenu {
  interface UseDisclosureExtendedProps extends UseDisclosureProps {
    onToggle: () => void;
  }
  export interface IProps extends FlexProps {
    disclosure: UseDisclosureExtendedProps;
  }
}
