// #region Global Imports
import React, { useRef } from 'react'

import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'

// #endregion Global Imports

// #region Local Imports
import { UnformCtaInput } from '@/components'
// #endregion Local Imports

// #region Interface Imports
import { ICallToActionForm } from '@/interfaces'
// #endregion Interface Imports

export const CallToActionForm: React.FC<ICallToActionForm.IProps> = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<ICallToActionForm.CtaFormData> = (data) => {
    console.log(data)
  }
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <UnformCtaInput
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        borderRadius="full"
        color="brand.800"
        focusBorderColor="brand.500"
      />
    </Form>
  )
}
