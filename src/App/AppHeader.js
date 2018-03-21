import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import loginIcon from '../static/noun_29782.svg'

class AppHeader extends Component {
  render() {
    const {pathname} = this.props.location
    return (
      <header className='app-header'>
        <div className='app-header-container'>
          <h1>Horário Universitário Personalizado</h1>
          <p>
            Maximização do horário do aluno por meta-heurística
          </p>
        </div>
        { pathname !== '/admin' &&
          <Link to='/login' className='login-button'>
            <img src={loginIcon} alt="login"/>
          </Link>
        }
      </header>
    );
  }
}

AppHeader.propTypes = {
  location: PropTypes.object
}

export default AppHeader;
