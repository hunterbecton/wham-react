import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import InputWrapper from './InputWrapper'

const Input = props => {
  const { label, name, ...rest } = props
  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </InputWrapper>
  )
}

export default Input
