import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classIcon from '../static/class.png'
import scheduleIcon from '../static/schedule.png'

const HomePage = ({match}) => {
  return (
    <div className='home-page'>
      <Link className='home-page-card' to='/admin/ofertas'>
          <img className='home-page-card-image' src={classIcon} alt=""/>
          Ofertas
      </Link>
      <Link to='/admin/grade' className='home-page-card'>
        <img className='home-page-card-image' src={scheduleIcon} alt=""/>
        Grade Curricular
      </Link>
    </div>
  )
}

export default HomePage
