import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import XLSX from 'xlsx'
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
  12: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' },
  14: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' },
  16: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '' }
}

const hourColumns = {
  8: '08:00 - 10:00',
  10: '10:00 - 12:00',
  12: '12:00 - 14:00',
  14: '14:00 - 16:00',
  16: '16:00 - 18:00'
}

const daysHeader = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira'
]

class ClassSchedule extends Component {
  state = {
    toHome: false,
    solution: null
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        solution: getInfo(ACCESS_SOLUTION_INFO)
      });
    }, 30);
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
    const classesGridFormated = this.formatGrid(this.state.solution)
    const data = Object.keys(classesGridFormated).map(hour => ([
        hourColumns[hour],
        ...Object.values(classesGridFormated[hour])
      ]));


    const ws = XLSX.utils.aoa_to_sheet([['', ...daysHeader], ...data]);
    const wb = XLSX.utils.book_new();

    const initialWscols = [
      {wch: 0},
      {wch: 0},
      {wch: 0},
      {wch: 0},
      {wch: 0},
      {wch: 0},
    ];

    const wscols = data.reduce((finalWscols, row) =>
      row.map((cell, index) => {
        if (cell.length > finalWscols[index].wch) {
          return {
            wch: cell.length
          }
        }

        return finalWscols[index]
      }), initialWscols)

    ws['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, 'Horário');
    XLSX.writeFile(wb, 'horário.xlsx');
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
                  rowHeader={hourColumns[8]} />
                <ClassScheduleRow 
                  classes={ classesGridFormated['10'] }
                  rowHeader={hourColumns[10]} />
                <ClassScheduleRow 
                  classes={ classesGridFormated['12'] }
                  rowHeader={hourColumns[12]} />
                <ClassScheduleRow 
                  classes={ classesGridFormated['14'] }
                  rowHeader={hourColumns[14]} />
                <ClassScheduleRow 
                  classes={ classesGridFormated['16'] }
                  rowHeader={hourColumns[16]} />
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
