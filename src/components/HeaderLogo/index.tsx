import React from 'react'
import {
  Icon,
  useTheme,
  useBreakpointValue,
  IconButton
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { IHeaderLogo } from './HeaderLogo'

const Logo = ({ theme }: any) => (
  <g id="logo">
    <path
      id="N"
      fill={theme.colors.brand[800]}
      d="M122.63,119.22a2.19,2.19,0,0,1-2.2,2.2h-12a2.2,2.2,0,0,1-2.08-1.46L75.48,33.17a2.2,2.2,0,0,0-4.27.85q.51,10.62.51,19.82v49.8H57.43L57.4,44,77.28.39Z"
    />
    <path
      id="L"
      fill={theme.colors.brand[500]}
      d="M72.92.29,73.06,0H58.28a2.19,2.19,0,0,0-2,1.25L.22,118.88a2.19,2.19,0,0,0,2,3.14l67.06.24a2.18,2.18,0,0,0,2.19-2.19V108.25l-48.47,0Z"
    />
    <rect fill={theme.colors.brand[800]} x="191.42" width="2" height="123" />
    <path
      fill={theme.colors.brand[500]}
      d="M271.75,86.48l0-16-7.84,13.18h-2.78l-7.81-12.84V86.48h-5.8V59.81h5.11l10,16.57,9.83-16.57h5.07l.07,26.67Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M304.52,81.53v5H283.87V59.81H304v5H290v5.79h12.38v4.8H290v6.18Zm-8.88-29.38H302l-6.9,5.49H290.5Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M309.43,59.81h12.11a17,17,0,0,1,7.68,1.66,12.36,12.36,0,0,1,5.18,4.67,14.21,14.21,0,0,1,0,14,12.4,12.4,0,0,1-5.18,4.66,17,17,0,0,1-7.68,1.66H309.43Zm11.81,21.6a8.94,8.94,0,0,0,6.38-2.23,7.83,7.83,0,0,0,2.38-6,7.86,7.86,0,0,0-2.38-6,8.94,8.94,0,0,0-6.38-2.23H315.6V81.41Z"
    />
    <path fill={theme.colors.brand[500]} d="M340.9,59.81h6.17V86.48H340.9Z" />
    <path
      fill={theme.colors.brand[500]}
      d="M358.78,85.17a13.33,13.33,0,0,1-5.18-4.92,14.37,14.37,0,0,1,0-14.21,13.23,13.23,0,0,1,5.18-4.91,15.32,15.32,0,0,1,7.41-1.78,15.62,15.62,0,0,1,6.27,1.22,12.57,12.57,0,0,1,4.71,3.51l-4,3.66a8.48,8.48,0,0,0-6.7-3.13,8.86,8.86,0,0,0-4.42,1.09,7.62,7.62,0,0,0-3,3,9.56,9.56,0,0,0,0,8.83,7.62,7.62,0,0,0,3,3,8.86,8.86,0,0,0,4.42,1.09,8.45,8.45,0,0,0,6.7-3.16l4,3.65a12.45,12.45,0,0,1-4.73,3.55,15.7,15.7,0,0,1-6.28,1.22A15.36,15.36,0,0,1,358.78,85.17Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M386.18,85.15A13.22,13.22,0,0,1,381,80.21a14.15,14.15,0,0,1,0-14.13,13.13,13.13,0,0,1,5.22-4.93,16.42,16.42,0,0,1,14.95,0,13.6,13.6,0,0,1,0,24,16.5,16.5,0,0,1-14.95,0Zm11.75-4.56a7.71,7.71,0,0,0,3-3,9.56,9.56,0,0,0,0-8.83,7.71,7.71,0,0,0-3-3,8.91,8.91,0,0,0-8.54,0,7.78,7.78,0,0,0-3,3,9.56,9.56,0,0,0,0,8.83,7.78,7.78,0,0,0,3,3,8.91,8.91,0,0,0,8.54,0Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M247.5,36.62h1V45h5.18v.85H247.5Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M261.05,42.69h-5.82a2.5,2.5,0,0,0,.83,1.76,2.78,2.78,0,0,0,1.9.66,2.87,2.87,0,0,0,1.19-.23,2.45,2.45,0,0,0,.94-.68l.53.61a3.06,3.06,0,0,1-1.15.85,4,4,0,0,1-1.53.29,3.9,3.9,0,0,1-1.9-.46,3.26,3.26,0,0,1-1.29-1.26,3.93,3.93,0,0,1,0-3.65A3.15,3.15,0,0,1,256,39.32a3.57,3.57,0,0,1,3.47,0,3.21,3.21,0,0,1,1.2,1.25,3.75,3.75,0,0,1,.44,1.83ZM256,40.32a2.47,2.47,0,0,0-.77,1.67h4.93a2.52,2.52,0,0,0-.77-1.67,2.38,2.38,0,0,0-1.7-.64A2.36,2.36,0,0,0,256,40.32Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M264,45.49a3.27,3.27,0,0,1-1.27-1.26,3.61,3.61,0,0,1-.46-1.83,3.54,3.54,0,0,1,.46-1.82A3.27,3.27,0,0,1,264,39.32a3.65,3.65,0,0,1,1.81-.45,3.69,3.69,0,0,1,1.82.45,3.31,3.31,0,0,1,1.26,1.26,3.64,3.64,0,0,1,.46,1.82,3.71,3.71,0,0,1-.46,1.83,3.31,3.31,0,0,1-1.26,1.26,3.7,3.7,0,0,1-1.82.46A3.66,3.66,0,0,1,264,45.49Zm3.14-.71a2.43,2.43,0,0,0,.92-1,3,3,0,0,0,.33-1.42,2.94,2.94,0,0,0-.33-1.41,2.31,2.31,0,0,0-.92-1,2.56,2.56,0,0,0-1.33-.34,2.61,2.61,0,0,0-1.33.34,2.31,2.31,0,0,0-.92,1,2.83,2.83,0,0,0-.34,1.41,2.9,2.9,0,0,0,.34,1.42,2.43,2.43,0,0,0,.92,1,2.7,2.7,0,0,0,1.33.33A2.65,2.65,0,0,0,267.15,44.78Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M276.9,39.63a3,3,0,0,1,.78,2.22v4h-.94V41.94a2.32,2.32,0,0,0-.54-1.66,2.09,2.09,0,0,0-1.55-.56,2.4,2.4,0,0,0-1.78.66,2.52,2.52,0,0,0-.66,1.85v3.65h-.94v-7h.9V40.2a2.6,2.6,0,0,1,1.07-1,3.44,3.44,0,0,1,1.58-.35A2.82,2.82,0,0,1,276.9,39.63Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M284.76,39.55a2.65,2.65,0,0,1,.72,2v4.31h-.9V44.8a2.12,2.12,0,0,1-.93.84,3.17,3.17,0,0,1-1.46.31,2.86,2.86,0,0,1-1.85-.56,1.91,1.91,0,0,1,0-2.9,3.16,3.16,0,0,1,2-.54h2.2v-.42a1.76,1.76,0,0,0-.5-1.37,2.08,2.08,0,0,0-1.47-.47,3.65,3.65,0,0,0-1.27.22,3.05,3.05,0,0,0-1,.6l-.43-.7a4,4,0,0,1,1.27-.7,5.1,5.1,0,0,1,1.57-.24A3,3,0,0,1,284.76,39.55Zm-1.06,5.29a2.11,2.11,0,0,0,.84-1.05V42.65h-2.18c-1.19,0-1.78.42-1.78,1.25a1.15,1.15,0,0,0,.46,1,2.14,2.14,0,0,0,1.3.35A2.51,2.51,0,0,0,283.7,44.84Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M289.92,39.23a3.34,3.34,0,0,1,1.62-.36v.91h-.22a2.22,2.22,0,0,0-1.72.67,2.66,2.66,0,0,0-.62,1.89v3.55H288v-7h.9v1.36A2.27,2.27,0,0,1,289.92,39.23Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M299.52,36.06v9.82h-.9V44.5a2.83,2.83,0,0,1-1.12,1.08,3.33,3.33,0,0,1-1.56.37,3.54,3.54,0,0,1-1.78-.45,3.2,3.2,0,0,1-1.24-1.26,4,4,0,0,1,0-3.68,3.17,3.17,0,0,1,1.24-1.25,3.64,3.64,0,0,1,1.78-.44,3.3,3.3,0,0,1,1.52.35,2.81,2.81,0,0,1,1.12,1V36.06Zm-2.19,8.72a2.52,2.52,0,0,0,.93-1,3,3,0,0,0,.34-1.42,2.94,2.94,0,0,0-.34-1.41,2.39,2.39,0,0,0-.93-1,2.73,2.73,0,0,0-2.64,0,2.27,2.27,0,0,0-.93,1,2.94,2.94,0,0,0-.34,1.41,3,3,0,0,0,.34,1.42,2.39,2.39,0,0,0,.93,1,2.8,2.8,0,0,0,2.64,0Z"
    />
    <path
      fill={theme.colors.brand[500]}
      d="M303.17,45.49a3.34,3.34,0,0,1-1.27-1.26,3.61,3.61,0,0,1-.46-1.83,3.54,3.54,0,0,1,.46-1.82,3.34,3.34,0,0,1,1.27-1.26,3.69,3.69,0,0,1,1.82-.45,3.65,3.65,0,0,1,1.81.45,3.18,3.18,0,0,1,1.26,1.26,3.54,3.54,0,0,1,.46,1.82,3.61,3.61,0,0,1-.46,1.83,3.18,3.18,0,0,1-1.26,1.26A3.66,3.66,0,0,1,305,46,3.7,3.7,0,0,1,303.17,45.49Zm3.15-.71a2.5,2.5,0,0,0,.92-1,3,3,0,0,0,.33-1.42,2.94,2.94,0,0,0-.33-1.41,2.37,2.37,0,0,0-.92-1,2.61,2.61,0,0,0-1.33-.34,2.56,2.56,0,0,0-1.33.34,2.33,2.33,0,0,0-.93,1,2.94,2.94,0,0,0-.34,1.41,3,3,0,0,0,.34,1.42,2.45,2.45,0,0,0,.93,1,2.65,2.65,0,0,0,1.33.33A2.7,2.7,0,0,0,306.32,44.78Z"
    />
    <path
      fill={theme.colors.brand[800]}
      d="M321.84,36.62v9.26H321l-6-7.51v7.51h-1V36.62h.81l6,7.51V36.62Z"
    />
    <path
      fill={theme.colors.brand[800]}
      d="M330.93,38.92v7H330V44.61a2.69,2.69,0,0,1-1,1,3.08,3.08,0,0,1-1.48.35,2.7,2.7,0,0,1-2.94-3v-4h.94v3.94a2.29,2.29,0,0,0,.55,1.67,2,2,0,0,0,1.54.57,2.28,2.28,0,0,0,1.74-.67,2.59,2.59,0,0,0,.63-1.86V38.92Z"
    />
    <path
      fill={theme.colors.brand[800]}
      d="M339.19,39.63a3,3,0,0,1,.78,2.22v4H339V41.94a2.32,2.32,0,0,0-.54-1.66,2.09,2.09,0,0,0-1.55-.56,2.4,2.4,0,0,0-1.78.66,2.52,2.52,0,0,0-.66,1.85v3.65h-.94v-7h.9V40.2a2.6,2.6,0,0,1,1.07-1,3.44,3.44,0,0,1,1.58-.35A2.82,2.82,0,0,1,339.19,39.63Z"
    />
    <path
      fill={theme.colors.brand[800]}
      d="M348.61,42.69h-5.82a2.5,2.5,0,0,0,.83,1.76,2.78,2.78,0,0,0,1.9.66,3,3,0,0,0,1.2-.23,2.49,2.49,0,0,0,.93-.68l.53.61a3,3,0,0,1-1.15.85,4,4,0,0,1-1.53.29,3.9,3.9,0,0,1-1.9-.46,3.26,3.26,0,0,1-1.29-1.26,3.93,3.93,0,0,1,0-3.65,3.22,3.22,0,0,1,1.22-1.26,3.57,3.57,0,0,1,3.47,0,3.21,3.21,0,0,1,1.2,1.25,3.65,3.65,0,0,1,.44,1.83Zm-5.05-2.37a2.52,2.52,0,0,0-.77,1.67h4.93a2.52,2.52,0,0,0-.77-1.67,2.38,2.38,0,0,0-1.7-.64A2.36,2.36,0,0,0,343.56,40.32Z"
    />
    <path
      fill={theme.colors.brand[800]}
      d="M350.78,45.7a3.59,3.59,0,0,1-1.21-.61l.43-.74a3.6,3.6,0,0,0,1.09.56,4.58,4.58,0,0,0,1.38.22,2.59,2.59,0,0,0,1.41-.3,1,1,0,0,0,.46-.84.76.76,0,0,0-.25-.6,1.56,1.56,0,0,0-.64-.33,8.25,8.25,0,0,0-1-.22,12.43,12.43,0,0,1-1.36-.33,1.91,1.91,0,0,1-.88-.56,1.57,1.57,0,0,1-.37-1.1,1.74,1.74,0,0,1,.73-1.43,3.29,3.29,0,0,1,2-.55,5.22,5.22,0,0,1,1.35.18,3.57,3.57,0,0,1,1.11.47l-.41.75a3.51,3.51,0,0,0-2.05-.59,2.4,2.4,0,0,0-1.36.31,1,1,0,0,0-.46.84.83.83,0,0,0,.26.63,1.53,1.53,0,0,0,.64.35,9.58,9.58,0,0,0,1.06.23c.56.11,1,.22,1.34.32a2.1,2.1,0,0,1,.86.54,1.5,1.5,0,0,1,.36,1.06,1.69,1.69,0,0,1-.77,1.45,3.58,3.58,0,0,1-2.11.54A5.18,5.18,0,0,1,350.78,45.7Z"
    />
  </g>
)

export const HeaderLogo: React.FunctionComponent<IHeaderLogo.IProps> = ({
  disclosure
}) => {
  const theme = useTheme()
  const viewBoxVariant = useBreakpointValue({
    base: '0 0 122.63 122.26',
    sm: '0 0 408.25 123',
    md: '0 0 408.25 123',
    lg: '0 0 408.25 123'
  })

  const heightVariant = useBreakpointValue({
    base: '40px',
    sm: '73px',
    md: '122px',
    lg: '122px'
  })
  const widhtVariant = useBreakpointValue({
    base: '40px ',
    sm: '245px',
    md: '408px',
    lg: '408px'
  })

  const viewBoxVariantDisclosureOpen = useBreakpointValue({
    base: '0 0 408.25 123',
    sm: '0 0 408.25 123',
    md: '0 0 408.25 123',
    lg: '0 0 408.25 123'
  })

  const heightVariantDisclosureOpen = useBreakpointValue({
    base: '100%',
    sm: '122px',
    md: '122px',
    lg: '122px'
  })
  const widhtVariantDisclosureOpen = useBreakpointValue({
    base: '85%',
    md: '408px',
    lg: '408px',
    xl: '408px'
  })

  return (
    <NextLink href="/" as="/">
      <IconButton
        bgColor="transparent"
        p={1}
        _active={{}}
        _hover={{}}
        aria-label="header-logo"
        h={disclosure.isOpen ? heightVariantDisclosureOpen : heightVariant}
        w={disclosure.isOpen ? widhtVariantDisclosureOpen : widhtVariant}
        icon={
          <Icon
            maxH={
              disclosure.isOpen ? heightVariantDisclosureOpen : heightVariant
            }
            viewBox={
              disclosure.isOpen ? viewBoxVariantDisclosureOpen : viewBoxVariant
            }
            objectFit="contain"
            w="100%"
            h="100%"
          >
            <Logo theme={theme} />
          </Icon>
        }
      />
    </NextLink>
  )
}
