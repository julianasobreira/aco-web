import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import './CourseCurriculum.css'

import fieldsValidation from '../utils/fieldsValidation'

import FormField from '../FormField/FormField'
import FormList from '../FormList/FormList'

class CourseCurriculumItem extends Component {
  render() {
    const { courseCurriculum, editMode } =  this.props
    const itemClass = editMode ? '--edit' : ''
    const { number, classCode } = fieldsValidation

    if (courseCurriculum.length === 0) {
      return (<div>Não há grade curricular adicionada.</div>)
    }

    return (
      <Fragment>
        {
          courseCurriculum.map((item, index) => (
            <div key={index} className={`course-curriculum-item${itemClass}`}>
              <FormField
                label='Nome'
                value={item.nome} />
              <FormField
                label='Código da disciplina'
                value={item.codDisciplina}
                errorMessage={classCode.errorMessage}
                isValid={classCode.isValid(item.codDisciplina)} />
              <FormField
                label='Carga Horária'
                value={item.cargaHoraria}
                errorMessage={number.errorMessage}
                isValid={number.isValid(item.cargaHoraria)} />
              <FormField
                label='Período'
                value={item.periodo}
                errorMessage={number.errorMessage}
                isValid={number.isValid(item.periodo)} />
              <FormField
                label='Ciclo'
                value={item.ciclo}
                errorMessage={number.errorMessage}
                isValid={number.isValid(item.periodo)} />
              <FormList
                label='Co-Requisitos'
                list={item.coRequisitos}
              />
              <FormList
                label='Pró-Requisitos'
                list={item.proRequisitos}
              />
              <FormList
                label='Pré-Requisitos'
                list={item.preRequisitos}
              />
              <FormList
                label='Equivalências'
                list={item.equivalencias}
              />
            </div>
          ))
        }
      </Fragment>
    )
  }
}

CourseCurriculumItem.propTypes = {
  courseCurriculum: PropTypes.array,
  editMode: PropTypes.bool
}

export default CourseCurriculumItem
