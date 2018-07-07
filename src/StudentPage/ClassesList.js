import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const ClassesList = ({ classes, handleInputChange }) => {
  if (!classes) {
    return null
  }

  if (classes && Object.values(classes).length === 0) {
    return <div className='student-form-list-message'>Esse curso não possui uma grade curricular adicionada. </div>
  }

  return (
    <Fragment>
     {
      Object.keys(classes).map(moduleName =>
        <div key={moduleName}>
          <h4>{moduleName}</h4>
          {
            classes[moduleName].map(item =>
              <div className='student-form-list-item' key={item.codDisciplina}>
                <input
                  name={item.codDisciplina}
                  type='checkbox'
                  value={item.codDisciplina}
                  onChange={e => handleInputChange(e, item)} />
                <span>{`${item.codDisciplina} - ${item.nome}`}</span>
              </div>   
            )
          }
        </div>
      )
     }
    </Fragment>
  )
}

ClassesList.propTypes = {
  classes: PropTypes.object,
  handleInputChange: PropTypes.func
}

export default ClassesList
