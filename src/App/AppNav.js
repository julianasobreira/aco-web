import React, { Component } from 'react';
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
import { clearInfo } from '../utils/localStorage'

class AppHeader extends Component {
  clearInfo = () => {
    clearInfo('access_auth_info')
  }

  render() {
    return (
      <section className='app-nav'>
        <div className='app-nav-container'>
          { isLoggedIn('access_auth_info')
            ? <a href='' className='login-button' onClick={this.clearInfo}>
                Logout
              </a>
            : <Link to='/login' className='login-button'>
                Login
              </Link>
          }
          { isLoggedIn('access_auth_info') && <Menu />}
        </div>
      </section>
    );
  }
}

export default AppHeader;
