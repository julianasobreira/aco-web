import React, { Component } from 'react';
import './AppHeader.css';

class AppHeader extends Component {
  render() {
    return (
      <header className='app-header'>
        <div className='app-header-container'>
          <h1>Horário Universitário Personalizado</h1>
          <p>
            Maximização do horário do aluno por meta-heurística
          </p>
        </div>
      </header>
    );
  }
}

export default AppHeader;
