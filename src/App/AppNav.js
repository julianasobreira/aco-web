import React, { Component } from 'react';
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { clearToken, isLoggedIn } from '../utils/auth'

class AppHeader extends Component {
  render() {
    return (
      <section className='app-nav'>
        <div className='app-nav-container'>
          { isLoggedIn()
            ? <a href='' className='login-button' onClick={clearToken}>
                Logout
              </a>
            : <Link to='/login' className='login-button'>
                Login
              </Link>
          }
          { isLoggedIn() && <Menu />}
        </div>
      </section>
    );
  }
}

export default AppHeader;
