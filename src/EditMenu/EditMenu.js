import React from 'react'
import './EditMenu.css'
import Select from 'react-select'

const EditMenu = ({onSave, onCancel}) => {
  return (
    <div className='course-curriculum-menu'>
      <div className='course-curriculum-menu-item'>Salvar Alterações</div>
      <div
        onClick={onCancel}
        className='course-curriculum-menu-item'>Descartar Alterações</div>
    </div>
  )
}

export default EditMenu
