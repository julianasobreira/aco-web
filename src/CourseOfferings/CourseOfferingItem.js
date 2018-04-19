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
    const { courseOffering } = this.props
    const { isOpen } = this.state

    return (
      <div className='course-offering-item'>
        <div className='course-offering-item-date'>{courseOffering.created_at}</div>
        <div className='course-offering-item-title'>
          <div className='course-offering-item-title'>Oferta {courseOffering.semester}</div>
          <button className='button'>Deletar</button>
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

CourseOfferingItem.propTypes = {
  courseOffering: PropTypes.object
}

export default CourseOfferingItem