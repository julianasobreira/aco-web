import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import axios from 'axios'
import { 
  getInfo, 
  setInfo, 
  ACCESS_AUTH_INFO,
  ACCESS_SOLUTION_INFO,
  ACCESS_FORM_INFO } from '../utils/localStorage'
import { Redirect } from 'react-router-dom'

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
    messageErrors: [],
    isFetching: false,
    isSolutionSuccess: false,
    isError: false
  }

  componentDidMount () {
    this.userInfo = getInfo(ACCESS_AUTH_INFO)
    const state = getInfo(ACCESS_FORM_INFO)
    if (state) {
      this.setState({ ...state })
    } else {
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
  }

  fetchClasses = () => {
    this.setState({ isFetching: true })

    axios.get(`${process.env.API_URL}/curso?curso=${this.state.course.value}`)
    .then(response => {
      const { disciplinas, semestres } = response.data
      const courseModules = {}
      disciplinas.forEach(item => {
        const updatedItem = {
          ...item,
          done: false
        }

        // divindindo as disciplinas por ciclo
        if (courseModules[item.ciclo]) {
          courseModules[item.ciclo] = [
            ...courseModules[item.ciclo],
            updatedItem
          ]
        } else {
          courseModules[item.ciclo] = [updatedItem]
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
    const {course, semester} = this.state
    const done = Object.values(this.state.classes)
      .reduce((module, allCourses) => [...allCourses, ...module], [])
      .filter(course => course.done)
    const messageErrors = []
    setInfo(ACCESS_FORM_INFO, this.state)

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
      setInfo(ACCESS_SOLUTION_INFO, classesGrid)
      this.setState({
        isFetching: false,
        isSolutionSuccess: true,
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
    this.setState({
      course: { ...item }
    }, this.fetchClasses)
  }

  handleSelectSemester = item => {
    this.setState({ semester: item && item.value })
  }

  handleInputChange = (e, module, index) => {
    const { checked } = e.target

    this.setState(prevState => ({
      classes: {
        ...prevState.classes,
        [module]: [
          ...prevState.classes[module].slice(0, index),
          {
            ...prevState.classes[module][index],
            done: checked
          },
          ...prevState.classes[module].slice(index + 1)
        ]
      }
    }))
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
      isFetching,
      isSolutionSuccess } = this.state

    if (isSolutionSuccess) {
      return <Redirect to={'/horario'} />;
    }

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

export default StudentForm
