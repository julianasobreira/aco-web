import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import axios from 'axios'
import { getInfo } from '../utils/localStorage'

import './StudentForm.css'
import 'react-select/dist/react-select.css'

import ClassesList from './ClassesList'
import MessageError from '../MessageError/MessageError'
import Loading from '../Loading/Loading'

class StudentForm extends Component {
  state = {
    course: null,
    courses: [],
    classes: null,
    semester: '',
    semesters: null,
    done: [],
    messageErrors: [],
    isFetching: false,
    isError: false
  }

  componentDidMount () {
    this.userInfo = getInfo('access_auth_info')
    this.setState({ isFetching: true })
    axios.get(`${process.env.API_URL}/cursos`)
    .then(response => {
      const courses = response.data.map(course => ({
        value: course.id,
        label: course.nome
      }))
      this.setState({
        isFetching: false,
        isError: false,
        courses
      })
    })
    .catch(error => {
      this.setState({
        isFetching: false,
        isError: true
      })
    })
  }

  fetchClasses = () => {
    this.setState({ isFetching: true })

    axios.get(`${process.env.API_URL}/curso?curso=${this.state.course.value}`)
    .then(response => {
      const { disciplinas, semestres } = response.data
      const courseModules = {}
      disciplinas.forEach(classItem => {
        // divindindo as disciplinas por ciclo
        if (courseModules[classItem.ciclo]) {
          courseModules[classItem.ciclo] = [
            ...courseModules[classItem.ciclo],
            classItem
          ]
        } else {
          courseModules[classItem.ciclo] = [classItem]
        }
      })
      this.setState({
        isFetching: false,
        isError: false,
        classes: courseModules,
        semesters: semestres.map(semester => ({ value: semester, label: semester }))
      })
    })
    .catch(error => {
      this.setState({
        isFetching: false,
        isError: true
      })
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { handleSolution } = this.props
    const {course, done, semester} = this.state

    const messageErrors = []
    if (!semester) {
      messageErrors.push('Escolha uma oferta')
    }

    if (done.length === 0) {
      messageErrors.push('Selecione as disciplinas que você cursou')
    }

    if (messageErrors.length > 0) {
      this.setState({messageErrors})
      return
    } else {
      this.setState({messageErrors: []})
    }

    this.setState({ isFetching: true })
    axios.post(`${process.env.API_URL}/solucao?curso=${course.value}&semestre=${semester}`, done)
    .then(response => {
      const classesGrid = response.data
      handleSolution(classesGrid)
      this.setState({
        isFetching: false,
        isError: false
      })
    })
    .catch(error => {
      this.setState({
        isFetching: false,
        isError: true
      })
    })
  }

  handleSelectCourse = item => {
    console.log(item)
    this.setState({
      course: { ...item }
    }, this.fetchClasses)
  }

  handleSelectSemester = item => {
    this.setState({ semester: item.value })
  }

  handleInputChange = (e, item) => {
    const { value, name } = e.target
    this.setState(prevState => {
      if (value) {
        return {
          done: [...prevState.done, item]
        }
      }
      return {
        done: prevState.done.filter(item => item.codDisciplina !== name)
      }
    })
  }

  render() {
    const {
      course,
      courses,
      classes,
      semester,
      semesters,
      messageErrors,
      isError,
      isFetching } = this.state

    return (
      <div className='student-form'>
        <h3>Curso</h3>
        { isError &&
          <MessageError errors={['Ocorreu um erro durante essa operação.']} />
        }
        <Select
          className='student-form-select'
          name='course'
          value={course && course.value}
          onChange={this.handleSelectCourse}
          options={courses}
        />
        { semesters &&
          <div>
            <h3>Ofertas</h3>
            <Select
              className='student-form-select'
              name='semester'
              value={semester}
              onChange={this.handleSelectSemester}
              options={semesters}
            />
          </div>
        }
        { classes &&
          <div>
            <h3>Disciplinas Cursadas</h3>
            <form className='student-form-list' onSubmit={this.handleFormSubmit}>
              <ClassesList 
                classes={ classes }
                handleInputChange={ this.handleInputChange } />
              { messageErrors.length > 0 &&
                <MessageError errors={messageErrors} />
              }
              <button className='student-form-button' type='submit'>Gerar grade</button>
            </form>
          </div>
        }
        { isFetching && <Loading /> }
      </div>
    )
  }
}

StudentForm.propTypes = {
  handleSolution: PropTypes.func,
}

export default StudentForm
