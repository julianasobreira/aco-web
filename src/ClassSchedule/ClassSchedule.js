import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ClassSchedule.css'

import ClassScheduleRow from './ClassScheduleRow'
import ClassScheduleHeader from './ClassScheduleHeader'

const initialClassesGrid = {
  8: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' },
  10: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' },
  14: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' },
  16: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' }
}

class ClassSchedule extends Component {
  formatGrid (classesGrid) {
    if (classesGrid) {
      classesGrid.forEach(classItem => {
        const { dia, horarioInicial } = classItem
        initialClassesGrid[horarioInicial][dia] = `${classItem.codOferta} - ${classItem.disciplinaOfertada.nome}`
      })
    }
    return initialClassesGrid
  }
  render() {
    const { classesGrid, showClassesGrid } = this.props
    const classesGridFormated = this.formatGrid(classesGrid)
    
    return (
      <div className='classes-schedule'>
        <span className='classes-schedule-link'>
          <a onClick={showClassesGrid}>Voltar ao formulário</a>
        </span>
        <div className='classes-schedule-container'>
          <ClassScheduleHeader />
          <ClassScheduleRow 
            classes={ classesGridFormated['8'] }
            rowHeader='08:00 - 10:00' />
          <ClassScheduleRow 
            classes={ classesGridFormated['10'] }
            rowHeader='10:00 - 12:00' />
          <ClassScheduleRow 
            classes={ classesGridFormated['14'] }
            rowHeader='14:00 - 16:00' />
          <ClassScheduleRow 
            classes={ classesGridFormated['16'] }
            rowHeader='16:00 - 18:00' />
        </div>
      </div>
    )
  }
}

ClassSchedule.propTypes = {
  classesGrid: PropTypes.array,
  showClassesGrid: PropTypes.func
}

export default ClassSchedule
