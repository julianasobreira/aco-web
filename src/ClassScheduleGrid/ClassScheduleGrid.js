import React, { Component } from 'react'
import './ClassScheduleGrid.css'
import PropTypes from 'prop-types'

const initialClassesGrid = {
  seg: { '8': '', '10': '', '14': '', '16': '' },
  ter: { '8': '', '10': '', '14': '', '16': '' },
  qua: { '8': '', '10': '', '14': '', '16': '' },
  qui: { '8': '', '10': '', '14': '', '16': '' },
  sex: { '8': '', '10': '', '14': '', '16': '' }
}

class ClassScheduleGrid extends Component {
  formatGrid (classesGrid) {
      classesGrid.forEach(classItem => {
      const { dia, horarioInicial } = classItem
      initialClassesGrid[dia][horarioInicial] = `${classItem.codOferta} - ${classItem.disciplinaOfertada.nome}`
    })
    return initialClassesGrid
  }
  render() {
    const { classesGrid, showClassesGrid } = this.props
    const classesGridFormated = this.formatGrid(classesGrid)
    
    return (
      <div className='classes-grid'>
        <span className='classes-grid-link'><a onClick={showClassesGrid}>Voltar ao formulário</a></span>
        <div className='classes-grid-container'>
          <div className='classes-grid-row--gray'>
            <div className='classes-grid-cell--col-header'></div>
            <div className='classes-grid-cell--col-header'>Segunda-Feira</div>
            <div className='classes-grid-cell--col-header'>Terça-feira</div>
            <div className='classes-grid-cell--col-header'>Quarta-Feira</div>
            <div className='classes-grid-cell--col-header'>Quinta-Feira</div>
            <div className='classes-grid-cell--col-header'>Sexta-Feira</div>
          </div>
          <div className='classes-grid-row'>
            <div className='classes-grid-cell--row-header'>08:00 - 10:00</div>
            <div className='classes-grid-cell'>{ classesGridFormated['seg']['8'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['ter']['8'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qua']['8'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qui']['8'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['sex']['8'] }</div>
          </div>
          <div className='classes-grid-row--gray'>
            <div className='classes-grid-cell--row-header'>10:00 - 12:00</div>
            <div className='classes-grid-cell'>{ classesGridFormated['seg']['10'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['ter']['10'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qua']['10'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qui']['10'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['sex']['10'] }</div>
          </div>
          <div className='classes-grid-row'>
            <div className='classes-grid-cell--row-header'>14:00 - 16:00</div>
            <div className='classes-grid-cell'>{ classesGridFormated['seg']['14'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['ter']['14'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qua']['14'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qui']['14'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['sex']['14'] }</div>
          </div>
          <div className='classes-grid-row--gray'>
            <div className='classes-grid-cell--row-header'>16:00 - 18:00</div>
            <div className='classes-grid-cell'>{ classesGridFormated['seg']['16'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['ter']['16'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qua']['16'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['qui']['16'] }</div>
            <div className='classes-grid-cell'>{ classesGridFormated['sex']['16'] }</div>
          </div>
        </div>
      </div>
    )
  }
}

ClassScheduleGrid.propTypes = {
  classesGrid: PropTypes.array,
  showClassesGrid: PropTypes.func
}

export default ClassScheduleGrid
