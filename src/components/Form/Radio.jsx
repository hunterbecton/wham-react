import React, { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import InputWrapper from './InputWrapper'

const Radio = props => {
  const { label, name, options, ...rest } = props
  return (
    <InputWrapper>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map(option => {
            return (
              <Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </InputWrapper>
  )
}

export default Radio
