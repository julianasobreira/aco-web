import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { clearToken } from '../utils/auth'

class AppHeader extends Component {
  handleLogout = () => {
    clearToken()
  }

  render() {
    const {pathname} = this.props.location
    return (
      <header className='app-header'>
        <div className='app-header-container'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1>Horário Universitário Personalizado</h1>
          </Link>
          <p>
            Maximização do horário do aluno por meta-heurística
          </p>
        </div>
        { !/^\/admin.*$/.test(pathname)
          ? <Link to='/login' className='login-button'>
              Login
              <i className="fa fa-sign-in"></i>
            </Link>
          : <a href='' className='login-button' onClick={this.handleLogout}>
              Logout
              <i className="fa fa-sign-out"></i>
            </a>
        }
      </header>
    );
  }
}

AppHeader.propTypes = {
  location: PropTypes.object
}

export default AppHeader;
