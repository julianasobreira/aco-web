import React, { Component, Fragment } from 'react'
import axios from 'axios'

import './CourseOfferings.css'

import CourseOfferingItem from './CourseOfferingItem'

class CourseOfferingsList extends Component {
  state = {
    courseOfferings: []
  }

  componentDidMount () {
    axios.get(`${process.env.API_URL}/oferta?curso=Engenharia da Computação`)
    .then(({data}) => {
        const horarios = {}

        // agrupar por semestre
        const has = Object.prototype.hasOwnProperty;
        data.forEach(horario => {
            if (has.call(horarios, horario.semestre)) {
                horarios[horario.semestre] = {
                    ...horarios[horario.semestre],
                    ofertas: [ ...horarios[horario.semestre].ofertas, horario]
                }
            } else {
                horarios[horario.semestre] = {
                    semester: horario.semestre,
                    created_at: horario.createdTime,
                    ofertas: [horario]
                }
            }
        })

        // ordernar lista pelo campo semestre de form descrescente
        const orderedCourseOfferings = Object.values(horarios).sort((h1, h2) => {
          const createdAt1 = h1.semester.split('.')
          const createdAt2 = h2.semester.split('.')

          if ((createdAt1[0] < createdAt2[0]) || ((createdAt1[0] === createdAt2[0]) && (createdAt1[1] < createdAt2[1]))) {
            return 1
          } else if((createdAt1[0] > createdAt2[0]) || ((createdAt1[0] === createdAt2[0]) && (createdAt1[1] > createdAt2[1]))) {
            return  -1
          }  else {
             return  0
          }
        })

        this.setState({
            courseOfferings: orderedCourseOfferings
        })
    })
  }

  deleteCourseOffering = semestre => {
    axios.delete(`${process.env.API_URL}/oferta?curso=Engenharia da Computação&semestre=${semestre}`)
    .then(() => {
        console.log('Deletado!')
        this.setState(prevState => ({
          courseOfferings: prevState.courseOfferings.filter(courseOffering => courseOffering.semester !== semestre)
        }))
    })
    .catch(error => {
        console.log('Erro: ', error)
    })
  }

  render() {
    const { courseOfferings } = this.state

    if (courseOfferings.length === 0) {
      return (<div>Não há ofertas adicionadas</div>)
    }

    return (
      <Fragment>
        {
          courseOfferings.map((courseOffering, index) =>
            <CourseOfferingItem
              key={index}
              courseOffering={courseOffering}
              deleteCourseOffering={this.deleteCourseOffering} />
          )
        }
      </Fragment>
    )
  }
}

export default CourseOfferingsList
