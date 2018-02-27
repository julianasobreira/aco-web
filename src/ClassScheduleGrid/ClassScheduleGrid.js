import React, { Component } from 'react'
import './ClassScheduleGrid.css'
import PropTypes from 'prop-types'

class ClassScheduleGrid extends Component {
  render() {
    const { classesGrid } = this.props

    return (
      <div className='classes-grid'>
        <div className='classes-grid-row'>
          <div className='classes-grid-cell'></div>
          <div className='classes-grid-cell'>Segunda-Feira</div>
          <div className='classes-grid-cell'>Terça-feira</div>
          <div className='classes-grid-cell'>Quarta-Feira</div>
          <div className='classes-grid-cell'>Quinta-Feira</div>
          <div className='classes-grid-cell'>Sexta-Feira</div>
        </div>
        <div className='classes-grid-row'>
          <div className='classes-grid-cell'>08:00 - 10:00</div>
          <div className='classes-grid-cell'>{ classesGrid['seg']['8'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['ter']['8'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qua']['8'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qui']['8'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['sex']['8'] }</div>
        </div>
        <div className='classes-grid-row'>
          <div className='classes-grid-cell'>10:00 - 12:00</div>
          <div className='classes-grid-cell'>{ classesGrid['seg']['10'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['ter']['10'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qua']['10'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qui']['10'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['sex']['10'] }</div>
        </div>
        <div className='classes-grid-row'>
          <div className='classes-grid-cell'>14:00 - 16:00</div>
          <div className='classes-grid-cell'>{ classesGrid['seg']['14'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['ter']['14'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qua']['14'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qui']['14'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['sex']['14'] }</div>
        </div>
        <div className='classes-grid-row'>
          <div className='classes-grid-cell'>16:00 - 18:00</div>
          <div className='classes-grid-cell'>{ classesGrid['seg']['16'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['ter']['16'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qua']['16'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['qui']['16'] }</div>
          <div className='classes-grid-cell'>{ classesGrid['sex']['16'] }</div>
        </div>
      </div>
    )
  }
}

ClassScheduleGrid.propTypes = {
  classesGrid: PropTypes.object
}

export default ClassScheduleGrid
