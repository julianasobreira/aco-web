import React, { Component } from 'react';
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
import { clearAllInfo, ACCESS_AUTH_INFO } from '../utils/localStorage'

class AppHeader extends Component {
  render() {
    return (
      <section className='app-nav'>
        <div className='app-nav-container'>
          { isLoggedIn(ACCESS_AUTH_INFO)
            ? <a href='' className='login-button' onClick={clearAllInfo}>
                Logout
              </a>
            : <Link to='/login' className='login-button'>
                Login
              </Link>
          }
          { isLoggedIn(ACCESS_AUTH_INFO) && <Menu />}
        </div>
      </section>
    );
  }
}

export default AppHeader;
