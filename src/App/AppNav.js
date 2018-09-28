import React, { Component, Fragment } from 'react';
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
import { clearInfo, ACCESS_AUTH_INFO } from '../utils/localStorage'
import { Redirect } from 'react-router-dom'

class AppHeader extends Component {
  state = {
    toHome: false
  } 

  clearAuthInfo = e => {
    e.preventDefault();
    clearInfo(ACCESS_AUTH_INFO)
    this.setState({
      toHome: true
    })
  }

  render() {
    return (
      <Fragment>
        <section className='app-nav'>
          <div className='app-nav-container'>
            { isLoggedIn(ACCESS_AUTH_INFO)
              ? <a className='login-button' onClick={this.clearAuthInfo}>
                  Logout
                </a>
              : <Link to='/login' className='login-button'>
                  Login
                </Link>
            }
            { isLoggedIn(ACCESS_AUTH_INFO) && <Menu />}
          </div>
        </section>
        { this.state.toHome && <Redirect to={'/'} />}
      </Fragment>
    );
  }
}

export default AppHeader;
