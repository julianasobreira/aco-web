import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { getInfo, ACCESS_AUTH_INFO } from '../utils/localStorage'

import './CourseOfferings.css'

import CourseOfferingItem from './CourseOfferingItem'
import Loading from '../Loading/Loading'
import MessageError from '../MessageError/MessageError'

class CourseOfferingsList extends Component {
  state = {
    courseOfferings: [],
    isFetching: false,
    isError: false
  }
  userInfo = null

  componentDidMount () {
    this.userInfo = getInfo(ACCESS_AUTH_INFO)
    this.fetchCourseList()
  }

  fetchCourseList = () => {
    this.setState({ isFetching: true })
    axios.get(`${process.env.API_URL}/oferta?curso=${this.userInfo.codCurso}`)
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
            courseOfferings: orderedCourseOfferings,
            isFetching: false,
            isError: false
        })
    })
    .catch(() => {
      this.setState({
          isFetching: false,
          isError: true
      })
    })
  }

  deleteCourseOffering = semestre => {
    this.setState({ isFetching: true })
    axios.delete(`${process.env.API_URL}/oferta?curso=${this.userInfo.codCurso}&semestre=${semestre}`)
    .then(() => {
        this.setState(prevState => ({
          isFetching: false,
          isError: false,
          courseOfferings: prevState.courseOfferings.filter(courseOffering => courseOffering.semester !== semestre)
        }))
    })
    .catch(error => {
        console.log('Erro: ', error)
        this.setState({
          isFetching: false,
          isError: true
      })
    })
  }

  render() {
    const { courseOfferings, isFetching, isError } = this.state

    if (courseOfferings.length === 0 && !isError && !isFetching) {
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
        { isFetching && <Loading /> }
        { isError && <MessageError errors={['Ocorreu um erro durante a operação.']} /> }
      </Fragment>
    )
  }
}

export default CourseOfferingsList
