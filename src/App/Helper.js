import React, { Component } from 'react';

class Helper extends Component {
  render() {
    return (
      <section className='helper'>
        <div className='helper-container'>
          <i className='fa fa-info-circle'></i> 
          <div className='helper-container-text'>
            Essa aplicação pretende ajudar aos discentes a montar uma grade horária que minimize atrasos durante a época de matrícula.
            Preencha os dados abaixo para obter sua grade sugerida. 
            <a className='helper-container-text-link'> Saiba mais.</a>
          </div>
        </div>
      </section>
    );
  }
}

export default Helper;
