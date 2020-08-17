import React from 'react'
import { Field } from 'formik'
import InputWrapper from './InputWrapper'

const Select = props => {
  const { label, name, options, ...rest } = props
  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
    </InputWrapper>
  )
}

export default Select
