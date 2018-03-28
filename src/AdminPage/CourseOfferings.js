import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CourseOfferings extends Component {
  state = {
    courseOfferings: ['2017.2', '2017.1']
  }
  render() {
    return (
      <div className='course-offerings'>
        <div className='course-offerings-header'>
          <div className='header-title'>
            <h2>Ofertas</h2>
          </div>
        </div>
        <ul>
          {
            this.state.courseOfferings.map((item, index) => (
              <li key={index}>Oferta {item} <a href="">Delete</a></li>
            ))
          }
        </ul>
        <div className='admin-page-button'>
          <Link to='/add-ofertas' style={{ textDecoration: 'none' }}>Adicionar Oferta</Link>
        </div>
      </div>
    )
  }
}

export default CourseOfferings
