import React, { Component, Fragment } from 'react'

const ClassScheduleHeader = () => {
  return (
    <Fragment>
      <div className='classes-schedule-header'></div>
      <div className='classes-schedule-header monday'>Segunda-Feira</div>
      <div className='classes-schedule-header tuesday'>Terça-feira</div>
      <div className='classes-schedule-header wednesday'>Quarta-Feira</div>
      <div className='classes-schedule-header thursday'>Quinta-Feira</div>
      <div className='classes-schedule-header friday'>Sexta-Feira</div>
    </Fragment>
  )
}

export default ClassScheduleHeader
