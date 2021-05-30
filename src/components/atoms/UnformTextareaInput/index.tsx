import React, { useEffect, useRef } from 'react'
import { FormErrorMessage, Textarea } from '@chakra-ui/react'
import { useField } from '@unform/core'
import { IUnformTextareaInput } from '@/interfaces'

export const UnformTextareaInput: React.FC<IUnformTextareaInput.IProps> = ({
  name,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
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
    <>
      <Textarea
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        focusBorderColor="brand.500"
        resize="vertical"
        {...rest}
      />

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </>
  )
}
