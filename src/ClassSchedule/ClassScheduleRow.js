import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ClassScheduleRow = ({classes, rowHeader}) => {
  return (
    <Fragment>
      <div className='classes-schedule-cell row-header'>{ rowHeader }</div>
      <div className='classes-schedule-cell monday'>
        { classes['seg'] && <div className='classes-schedule-time'>{ rowHeader }</div>}
        { classes['seg'] }
      </div>
      <div className='classes-schedule-cell tuesday'>
        { classes['ter'] && <div className='classes-schedule-time'>{ rowHeader }</div>}
        { classes['ter'] }
      </div>
      <div className='classes-schedule-cell wednesday'>
        { classes['qua'] && <div className='classes-schedule-time'>{ rowHeader }</div>}
        { classes['qua'] }
      </div>
      <div className='classes-schedule-cell thursday'>
        { classes['qui'] && <div className='classes-schedule-time'>{ rowHeader }</div>}
        { classes['qui'] }
      </div>
      <div className='classes-schedule-cell friday'>
        { classes['sex'] && <div className='classes-schedule-time'>{ rowHeader }</div>}
        { classes['sex'] }
      </div>
      <div className='classes-schedule-cell saturday'>
        { classes['sab'] && <div className='classes-schedule-time'>{ rowHeader }</div>}
        { classes['sab'] }
      </div>
    </Fragment>
  )
}

ClassScheduleRow.propTypes = {
  classes: PropTypes.object,
  rowHeader: PropTypes.string
}

export default ClassScheduleRow
