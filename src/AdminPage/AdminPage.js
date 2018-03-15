import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './AdminPage.css'
import CourseOfferings from './CourseOfferings'
import AddCourseOfferings from './AddCourseOfferings'

const Admin = ({match}) => {
  return (
    <div className='admin-page'>
      <Switch>
        <Route path={match.url + '/ofertas'} component={AddCourseOfferings}/>
        <Route exact path={match.url} component={CourseOfferings}/>
      </Switch>
    </div>
  )
}

export default Admin
