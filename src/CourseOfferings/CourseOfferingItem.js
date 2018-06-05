import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './CourseOfferingItem.css'

import FormField from '../FormField/FormField'

import fieldsValidation from '../utils/fieldsValidation'

class CourseOfferingItem extends Component {
  state = {
    isOpen: false
  }

  toggleDescription = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  deleteCourseOffering = () => {
    const { deleteCourseOffering, courseOffering } = this.props
    deleteCourseOffering(courseOffering.semester)
  }

  description = (item, index) => {
    const { number, weekday, classCode, offeringCode } = fieldsValidation
    return (
      <div key={index} className='course-offering-item-content'>
        <FormField 
          label={'Código de Oferta'}
          value={item.codOferta}
          errorMessage={offeringCode.errorMessage}
          isValid={offeringCode.isValid(item.codOferta)} />
        <FormField 
          label={'Código da Disciplina'}
          value={item.codDisciplina}
          errorMessage={classCode.errorMessage}
          isValid={classCode.isValid(item.codDisciplina)} />
        <FormField 
          label={'Dia'}
          value={item.dia}
          errorMessage={weekday.errorMessage}
          isValid={weekday.isValid(item.dia)} />
        <FormField 
          label={'Horário Inicial'}
          value={item.horarioInicial}
          errorMessage={number.errorMessage}
          isValid={number.isValid(item.horarioInicial)} />
        <FormField 
          label={'Duração'}
          value={item.duracaoHoras}
          errorMessage={number.errorMessage}
          isValid={number.isValid(item.duracaoHoras)} />
      </div>
    )
  }

  render() {
    const { courseOffering, editMode } = this.props
    const { isOpen } = this.state
    const created_at = new Date(courseOffering.created_at).toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })

    if (editMode) {
      return (
        <div className='course-offering-item--edit'>
          <div className='course-offering-item-title'>
            <div className='course-offering-item-title'>Oferta {courseOffering.semester}</div>
          </div>
          { courseOffering.ofertas.map((item, index) => this.description(item, index)) }
        </div>
      )
    }

    return (
      <div className='course-offering-item'>
        <div className='course-offering-item-date'>{created_at}</div>
        <div className='course-offering-item-title'>
          <div className='course-offering-item-title'>Oferta {courseOffering.semester}</div>
          <button className='button' onClick={this.deleteCourseOffering}>Deletar</button>
        </div>
        { isOpen && courseOffering.ofertas.map((item, index) => this.description(item, index)) }
        <div
          onClick={this.toggleDescription}
          className='course-offering-item-toggle'>
          { isOpen
            ? <i className='fa fa-angle-up'></i>
            : <i className='fa fa-angle-down'></i>
          }
        </div>
      </div>
    )
  }
}

CourseOfferingItem.defaultProps = {
  editMode: false
};

CourseOfferingItem.propTypes = {
  deleteCourseOffering: PropTypes.func,
  courseOffering: PropTypes.object,
  editMode: PropTypes.bool
}

export default CourseOfferingItem
