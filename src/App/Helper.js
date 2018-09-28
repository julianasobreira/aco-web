import React, { Component } from 'react';

class Helper extends Component {
  render() {
    return (
      <section className='helper'>
        <div className='helper-container'>
          <i className='fa fa-info-circle'></i> 
          <div className='helper-container-text'>
            Essa aplicação busca auxilar estudantes que não estão regulares em seus cursos a construírem seu horário levando 
            em consideração suas restrições.
            Preencha os dados abaixo para gerar sua grade sugerida utilizando meta-heurística. 
          </div>
        </div>
      </section>
    );
  }
}

export default Helper;
