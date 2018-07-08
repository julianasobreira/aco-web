import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const ClassesList = ({ classes, handleInputChange }) => {
  if (!classes) {
    return null
  }

  if (classes && Object.values(classes).length === 0) {
    return <div className='message'>Esse curso não possui uma grade curricular adicionada. </div>
  }

  return (
    <Fragment>
     {
      Object.keys(classes).map((module, moduleIndex) =>
        <div key={moduleIndex}>
          <h4>{module}</h4>
          {
            classes[module].map((item, itemIndex) =>
              <div className='student-form-list-item' key={itemIndex}>
                <input
                  name={item.codDisciplina}
                  type='checkbox'
                  checked={item.done}
                  onChange={e => handleInputChange(e, module, itemIndex)} />
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
