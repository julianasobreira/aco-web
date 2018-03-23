import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classIcon from '../static/class.png'
import scheduleIcon from '../static/schedule.png'

const HomePage = ({match}) => {
  return (
    <div className='home-page'>
      <Link className='home-page-card' to='/admin/ofertas'>
        <i className="fa fa-calendar"></i>
        Ofertas
      </Link>
      <Link to='/admin/grade' className='home-page-card'>
        <i className="fa fa-graduation-cap"></i>
        Grade Curricular
      </Link>
    </div>
  )
}

export default HomePage
