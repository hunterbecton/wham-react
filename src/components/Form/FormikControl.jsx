import React from 'react'
import Input from './Input'
import TextArea from './TextArea'
import Select from './Select'
import SelectNe from './SelectNe'
import Radio from './Radio'
import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker'

const FormikControl = props => {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <TextArea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'selectNe':
      return <SelectNe {...rest} />
    case 'radio':
      return <Radio {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'date':
      return <DatePicker {...rest} />
    default:
      return null
  }
}

export default FormikControl
