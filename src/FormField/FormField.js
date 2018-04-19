import React from 'react'
import './FormField.css'

const FormField = ({label = '', value = '', errorMessage='', isValid = true}) => {
  return (
    <div className={!isValid ? 'form-field-error' : 'form-field'}>
      <span className='form-field-label'>{label}: </span>
      <span>{value}</span>
      {!isValid
        ? <span className='form-field-error-message'>{errorMessage}</span>
        : null
      }
    </div>
  )
}

export default FormField