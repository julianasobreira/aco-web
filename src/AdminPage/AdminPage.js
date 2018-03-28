import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './AdminPage.css'
import CourseOfferings from './CourseOfferings'
import AddCourseOfferings from './AddCourseOfferings'
import CourseCurriculum from './CourseCurriculum'

const Admin = ({match}) => {
  return (
    <div className='admin-page'>
      <Switch>
        <Route path={match.url + '/grade'} component={CourseCurriculum}/>
        <Route path={match.url + '/ofertas'} component={CourseOfferings}/>
        <Route path={match.url + '/add-ofertas'} component={AddCourseOfferings}/>
      </Switch>
    </div>
  )
}

export default Admin
