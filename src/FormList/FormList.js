import React from 'react'
import './FormList.css'

const FormList = ({label = '', type = 'text', list = [] }) => {
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

export default FormList
