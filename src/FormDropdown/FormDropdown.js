import React from 'react'
import './FormDropdown.css'
import Select from 'react-select'

const FormDropdown = ({disabled = true, label = '', value = '', options = [], onChange}) => {
  if (disabled) {
    return (
      <div>
        <span className='form-dropdown-label'>{label}: </span>
        <span>{value}</span>
      </div>
    )
  }

  return (
    <div>
      <div className='form-dropdown-label'>{label}: </div>
      <Select
        value={value}
        options={options} />
    </div>
  )
}

export default FormDropdown
