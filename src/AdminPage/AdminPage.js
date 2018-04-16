import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './AdminPage.css'
import CourseOfferings from '../CourseOfferings/CourseOfferings'
import CourseCurriculum from '../CourseCurriculum/CourseCurriculum'

const Admin = ({match}) => {
  return (
    <div className='admin-page'>
      <Switch>
        <Route path={match.url + '/grade'} component={CourseCurriculum}/>
        <Route path={match.url + '/ofertas'} component={CourseOfferings}/>
      </Switch>
    </div>
  )
}

export default Admin
