import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth'
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
