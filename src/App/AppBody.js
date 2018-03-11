import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom';

import StudentPage from '../StudentPage/StudentPage'
import AdminPage from '../AdminPage/AdminPage'

const AppBody = ({ isFetching }) => {
  return (
    <section className='app-body'>
      <div className='app-body-container'>
        <Switch>
          <Route exact path='/' render={ props => (
            <StudentPage {...props} isFetching={isFetching} />
          )}/>
          <Route path='/admin' render={ props => (
            <AdminPage {...props} isFetching={isFetching} />
          )}/>
        </Switch>
      </div>
    </section>
  )
}

AppBody.propTypes = {
  isFetching: PropTypes.func
}

export default AppBody
