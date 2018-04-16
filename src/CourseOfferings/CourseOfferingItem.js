import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CourseOfferingItem.css'

class CourseOfferingItem extends Component {
  state = {
    isOpen: false
  }

  toggleDescription = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  description = item => {
    return (
      <div className='course-offering-item-content'>
        <div>Dia: </div>
        <div>Horário: </div>
        <div>Disciplina: </div>
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
        { isOpen && courseOffering.ofertas.map(item => this.description(item)) }
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
