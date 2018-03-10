import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ClassesList.css'

const ClassesList = ({ classes, handleFormSubmit }) => {
  if (!classes) {
    return null
  }

  return (
    <div className='classes-list'>
      <h3>Disciplinas Cursadas</h3>
      <form onSubmit={handleFormSubmit}>
       {
        Object.keys(classes).map(moduleName =>
          <div key={moduleName}>
            <h4>{moduleName}</h4>
            {
              classes[moduleName].map(item =>
                <div key={item.codDisciplina}>
                  <input
                    name={item.codDisciplina}
                    type='checkbox'
                    value={item.codDisciplina}
                    onChange={e => this.handleInputChange(e, item)} />
                  <span>{`${item.codDisciplina} - ${item.nome}`}</span>
                </div>   
              )
            }
          </div>
        )
       }
       <button className='classes-list-button' type='submit'>Gerar grade</button>
    </form> 
    </div>
  )
}

ClassesList.propTypes = {
  classes: PropTypes.object,
  handleFormSubmit: PropTypes.func
}

export default ClassesList
