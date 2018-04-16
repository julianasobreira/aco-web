import React from 'react'
import './FormInput.css'

const FormInput = ({disabled = true, label = '', type = 'text', value = '', onChange}) => {
  if (disabled) {
    return (
      <div>
        <span className='form-input-label'>{label}: </span>
        <span>{value}</span>
      </div>
    )
  }

  return (
    <div>
      <div className='form-input-label'>{label}: </div>
      <input
        value={value}
        type={type}
        onChange={onChange}/>
    </div>
  )
}

export default FormInput
