import React, { useEffect, useRef } from 'react'
import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue
} from '@chakra-ui/react'
import { useField } from '@unform/core'
import { IUnformCtaInput } from './UnformCtaInput'
import { AiOutlineMail } from 'react-icons/ai'
import { CallToActionButton } from '..'
import { MdChevronRight } from 'react-icons/md'

export const UnformCtaInput: React.FC<IUnformCtaInput.IProps> = ({
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const ctaButtonText = useBreakpointValue({
    base: <Icon as={MdChevronRight} w={6} h={6} />,
    sm: 'Agendar consulta'
  })

  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])
  return (
    <FormControl>
      <InputGroup borderRadius="full" boxShadow="base" size="lg">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <Icon as={AiOutlineMail} w={6} h={6} />
        </InputLeftElement>
        <Input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
        <InputRightElement w="">
          <CallToActionButton
            type="submit"
            size="lg"
            w={['45px', '195px']}
            transition="width 0.4s"
            text={ctaButtonText}
          />
        </InputRightElement>
      </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
