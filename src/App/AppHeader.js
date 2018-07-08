import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppNav from './AppNav';

class AppHeader extends Component {
  render() {
    const {pathname} = this.props.location
    return (
      <header className='app-header'>
        <AppNav />
        <div className='app-header-container'>
          <i className='fa fa-graduation-cap'></i>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <h1 className='app-header-title'>Horário Universitário Personalizado</h1>
          </Link>
          <p className='app-header-subtitle'>
            Maximização do horário do aluno por meta-heurística
          </p>
        </div>
      </header>
    );
  }
}

AppHeader.propTypes = {
  location: PropTypes.object
}

export default AppHeader;
