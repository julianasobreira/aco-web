import React, { Component } from 'react'
import './FormList.css'

const FormList = ({disabled = true, label = '', type = 'text', list = [] }) => {
  if (disabled) {
    return (
      <div>
        <div className='form-list-label'>{label}: </div>
        <div>
        { list.length === 0
          ? <div className='form-list-text--empty'>Nenhum item adicionado</div>
          : list.map((item, index) =>
              <div key={index} className='form-list-text'>{item}</div>) }
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='form-list-label'>{label}: </div>
      <div>
      { list.length === 0
        ? <input
            className='form-list-input'
            value=''
            type={type} />
        : list.map((item, index) =>
            <input
              className='form-list-input'
              key={index}
              value={item}
              type={type} />
          )
      }
      </div>
    </div>
  )
}

export default FormList
