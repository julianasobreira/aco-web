import React from 'react'
import './EditMenu.css'

const EditMenu = ({onSave, onCancel}) => {
  return (
    <div className='course-curriculum-menu'>
      <div
        onClick={onSave}
        className='course-curriculum-menu-item'>Salvar Alterações</div>
      <div
        onClick={onCancel}
        className='course-curriculum-menu-item'>Descartar Alterações</div>
    </div>
  )
}

export default EditMenu
