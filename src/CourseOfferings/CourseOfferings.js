import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CourseOfferingItem from './CourseOfferingItem'

class CourseOfferings extends Component {
  state = {
    courseOfferings: [
      {
        semester: '2017.2',
        created_at: '10/10/2018',
        ofertas: [
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          },
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          }
        ]
      },
      {
        semester: '2017.1',
        created_at: '10/10/2018',
        ofertas: [
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          },
          {
            dia: 'dia',
            horario: 'horario',
            disciplina: 'disciplina'
          }
        ]
      }
    ]
  }
  render() {
    const { courseOfferings } = this.state

    return (
      <div className='course-offerings'>
        <div className='course-offerings-header'>
          <div className='header-title'>
            <h2>Ofertas</h2>
          </div>
        </div>
        {
          courseOfferings.map((item, index) =>
            <CourseOfferingItem key={index} courseOffering={item}/>
          )
        }
      </div>
    )
  }
}

export default CourseOfferings
