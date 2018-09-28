import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ClassesList = ({ classes, handleInputChange, allClassesDone }) => {
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
        <Fragment key={moduleIndex}>
          <h4>{module}</h4>
          {
            classes[module].map((item, itemIndex) =>
              <div className='student-form-list-item' key={itemIndex}>
                <input
                  name={item.codDisciplina}
                  type='checkbox'
                  checked={!!allClassesDone.find(done => item.codDisciplina === done)}
                  onChange={e => handleInputChange(e, item.codDisciplina)} />
                <span>{`${item.codDisciplina} - ${item.nome}`}</span>
              </div>   
            )
          }
        </Fragment>
      )
     }
    </Fragment>
  )
}

ClassesList.propTypes = {
  classes: PropTypes.object,
  handleInputChange: PropTypes.func,
  allClassesDone: PropTypes.array,
}

export default ClassesList
