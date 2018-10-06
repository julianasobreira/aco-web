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

const getInitialClassesGrid = () => ({
  7: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  8: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  9: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  10: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  11: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  12: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  13: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  14: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  15: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  16: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  17: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  18: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  19: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  20: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  21: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
  22: { 'seg': '', 'ter': '', 'qua': '', 'qui': '', 'sex': '', 'sab': '' },
})

const hourColumns = {
  7: '07:00',
  8: '08:00',
  9: '09:00',
  10: '10:00',
  11: '11:00',
  12: '12:00',
  13: '13:00',
  14: '14:00',
  15: '15:00',
  16: '16:00',
  17: '17:00',
  18: '18:00',
  19: '19:00',
  20: '20:00',
  21: '21:00',
  22: '22:00',
}

const daysHeader = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

class ClassSchedule extends Component {
  state = {
    toHome: false,
    solution: this.formatGrid(getInfo(ACCESS_SOLUTION_INFO))
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  formatGrid (classesGrid) {
    const initialClassesGrid = getInitialClassesGrid()
    if (classesGrid) {
      classesGrid.forEach(classItem => {
        const { dia, horarioInicial } = classItem
        initialClassesGrid[horarioInicial][dia] = `${classItem.codDisciplina} - ${classItem.disciplinaOfertada}`
      })

      return initialClassesGrid
    }

    return {}
  }

  downloadSolutionGrid = () => {
    const { solution } = this.state;
    const data = Object.keys(solution).map(hour => ([
        hourColumns[hour],
        ...Object.values(solution[hour])
      ]));


    const ws = XLSX.utils.aoa_to_sheet([['', ...daysHeader], ...data]);
    const wb = XLSX.utils.book_new();

    const initialWscols = [
      {wch: 0},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
      {wch: 15},
    ];

    const wscols = data.reduce((finalWscols, row) =>
      row.map((cell, index) => {
        if (cell.length > finalWscols[index].wch) {
          return {
            wch: cell.length + 2
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
    const { solution, toHome} = this.state;
    
    if (toHome) {
      return <Redirect to={'/'} />;
    }

    return (
      <div className='classes-schedule'>
        <span className='classes-schedule-link'>
          <a onClick={this.redirectToHome}>
            <i className='fa fa-long-arrow-left'></i> Voltar ao formulário
          </a>
          <a onClick={this.downloadSolutionGrid}>
            <i className='fa fa-download'></i> Baixar horário
          </a>
        </span>
        <Fragment>
        
          { solution
            ? <div className='classes-schedule-container' ref={solutionGrid => this.solutionGrid = solutionGrid}>
                <ClassScheduleHeader />
                <ClassScheduleRow 
                  classes={ solution['7'] }
                  rowHeader={hourColumns[7]} />
                <ClassScheduleRow 
                  classes={ solution['8'] }
                  rowHeader={hourColumns[8]} />
                <ClassScheduleRow 
                  classes={ solution['9'] }
                  rowHeader={hourColumns[9]} />
                <ClassScheduleRow 
                  classes={ solution['10'] }
                  rowHeader={hourColumns[10]} />
                <ClassScheduleRow 
                  classes={ solution['11'] }
                  rowHeader={hourColumns[11]} />
                <ClassScheduleRow 
                  classes={ solution['12'] }
                  rowHeader={hourColumns[12]} />
                <ClassScheduleRow 
                  classes={ solution['13'] }
                  rowHeader={hourColumns[13]} />
                <ClassScheduleRow 
                  classes={ solution['14'] }
                  rowHeader={hourColumns[14]} />
                <ClassScheduleRow 
                  classes={ solution['15'] }
                  rowHeader={hourColumns[15]} />
                <ClassScheduleRow 
                  classes={ solution['16'] }
                  rowHeader={hourColumns[16]} />
                <ClassScheduleRow 
                  classes={ solution['17'] }
                  rowHeader={hourColumns[17]} />
                <ClassScheduleRow 
                  classes={ solution['18'] }
                  rowHeader={hourColumns[18]} />
                <ClassScheduleRow 
                  classes={ solution['19'] }
                  rowHeader={hourColumns[19]} />
                <ClassScheduleRow 
                  classes={ solution['20'] }
                  rowHeader={hourColumns[20]} />
                <ClassScheduleRow 
                  classes={ solution['21'] }
                  rowHeader={hourColumns[21]} />
                <ClassScheduleRow 
                  classes={ solution['21'] }
                  rowHeader={hourColumns[22]} />
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
