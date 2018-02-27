import React, { Component } from 'react';
import './AppBody.css';
import StudentForm from '../StudentForm/StudentForm';

class AppBody extends Component {
  render() {
    return (
      <section className='app-body'>
        <div className='app-body-container'>
          <StudentForm />
        </div>
      </section>
    );
  }
}

export default AppBody;
