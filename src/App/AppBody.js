import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth'
import StudentForm from '../StudentForm/StudentForm'
import AdminPage from '../AdminPage/AdminPage'
import Diagram from '../Diagram/Diagram'
import ClassSchedule from '../ClassSchedule/ClassSchedule'

const AppBody = ({ isFetching }) => {
  return (
    <section className='app-body'>
      <div className='app-body-container'>
        <Switch>
          <Route exact path='/' component={StudentForm} />
          <Route exact path='/grade-curricular' component={Diagram} />
          <Route exact path='/horario' component={ClassSchedule} />
          <Route path='/admin' render={ props => {
            return ( 
              isLoggedIn()
                ? <AdminPage {...props} isFetching={isFetching} />
                : <Redirect
                  to={{
                    pathname: '/',
                    state: { from: props.location }
                  }}
                />
            )
          }}/>
        </Switch>
      </div>
    </section>
  )
}

AppBody.propTypes = {
  isFetching: PropTypes.func
}

export default AppBody
