import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { 
  getInfo,
  ACCESS_SOLUTION_INFO } from '../utils/localStorage'
import { Redirect } from 'react-router-dom'

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
  state = {
    toHome: false,
    solution: null
  }

  componentDidMount () {
    this.setState({
      solution: getInfo(ACCESS_SOLUTION_INFO)
    })
  }

  formatGrid (classesGrid) {
    if (classesGrid) {
      classesGrid.forEach(classItem => {
        const { dia, horarioInicial } = classItem
        initialClassesGrid[horarioInicial][dia] = `${classItem.codOferta} - ${classItem.disciplinaOfertada.nome}`
      })
    }
    return initialClassesGrid
  }

  downloadSolutionGrid = () => {
    html2canvas(this.solutionGrid)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 30, 180, 110);
        pdf.output('dataurlnewwindow');
        pdf.save('horário otimizado.pdf');
      })
  }

  redirectToHome = () => {
    this.setState({ toHome: true })
  }

  render() {
    const classesGridFormated = this.formatGrid(this.state.solution)
    
    if (this.state.toHome) {
      return <Redirect to={'/'} />;
    }

    return (
      <div className='classes-schedule'>
        <span className='classes-schedule-link'>
          <a onClick={this.redirectToHome}>Voltar ao formulário</a>
          <a onClick={this.downloadSolutionGrid}>Baixar horário</a>
        </span>
        <Fragment>
        
          { this.state.solution
            ? <div className='classes-schedule-container' ref={solutionGrid => this.solutionGrid = solutionGrid}>
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
            : <div className='message'>Retorne ao formulário e preencha seus campos.</div>
          }
        </Fragment>
      </div>
    )
  }
}

ClassSchedule.propTypes = {
  classesGrid: PropTypes.array
}

export default ClassSchedule
