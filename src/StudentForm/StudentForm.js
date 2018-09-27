import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { 
  getInfo,
  setInfo,
  clearAllInfo,
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
    allClassesDone: [],
    semester: '',
    semesters: null,
    messageErrors: [],
    isFetching: false,
    isSolutionSuccess: false,
    isError: false
  }

  componentDidMount () {
    this.userInfo = getInfo(ACCESS_AUTH_INFO)

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

  fetchClasses = (course) => {
    this.setState({ isFetching: true })

    axios.get(`${process.env.API_URL}/curso?curso=${course}`)
    .then(response => {
      const { disciplinas, semestres } = response.data
      const courseModules = {}
      disciplinas.forEach(item => {
        // divindindo as disciplinas por ciclo
        if (courseModules[item.ciclo]) {
          courseModules[item.ciclo] = [
            ...courseModules[item.ciclo],
            item
          ]
        } else {
          courseModules[item.ciclo] = [item]
        }
      })

      const state = getInfo(ACCESS_FORM_INFO)
      let semester = ''
      let allClassesDone = []
      const { course } = this.state;

      if (state && (course.label === state.course.label ||
          course.value === state.course.value)) {
        semester = semestres.find(semestre => semestre === state.semester)
        allClassesDone = state.allClassesDone
      }

      this.setState({
        isFetching: false,
        isError: false,
        classes: courseModules,
        semesters: semestres.map(semester => ({ value: semester, label: semester })),
        allClassesDone,
        semester
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
    const {
      course,
      semester,
      allClassesDone,
      classes } = this.state

    const done = Object.values(classes)
      .reduce((module, allCourses) => [...allCourses, ...module], [])
      .filter(course => allClassesDone.find(item => item === course.codDisciplina))

    const messageErrors = []

    if (!semester) {
      messageErrors.push('Escolha uma oferta')
    }

    if (allClassesDone.length === 0) {
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
      const classesGrid = response.data.map(item => ({
        dia: item.dia,
        codOferta: item.codOferta,
        horarioInicial: item.horarioInicial,
        disciplinaOfertada: item.disciplinaOfertada.nome
      }))

      setInfo(ACCESS_SOLUTION_INFO, classesGrid)
      
      const allClasses = [
        ...classes['CICLO GERAL OU CICLO BÁSICO'],
        ...classes['CICLO PROFISSIONAL OU TRONCO COMUM'],
        ...classes['COMPONENTES OPTATIVOS - DISCIPLINAS OPTATIVAS']
      ]

      setInfo(ACCESS_FORM_INFO, {
        semester: semester,
        course: course,
        allClassesDone
      })

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
    }, () => { this.fetchClasses(this.state.course.value) })
  }

  handleSelectSemester = item => {
    this.setState({ semester: item && item.value })
  }

  handleInputChange = (e, codDisciplina) => {
    const { checked } = e.target

    this.setState(prevState => ({
      allClassesDone: [
        ...prevState.allClassesDone,
        codDisciplina
      ]
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
      isSolutionSuccess,
      allClassesDone } = this.state

    if (isSolutionSuccess) {
      return <Redirect to={'/horario'} />;
    }

    return (
      <div>
        <div className='student-form'>
          <h3>Curso</h3>
          { isError &&
            <MessageError errors={['Ocorreu um erro durante essa operação.']} />
          }
          <Select
            className='student-form-select'
            name='course'
            placeholder='Selecione um curso para continuar'
            value={course && course.value}
            onChange={this.handleSelectCourse}
            options={courses}
          />
          { semesters &&
            <Fragment>
              <h3>Ofertas</h3>
              <Select
                className='student-form-select'
                name='semester'
                value={semester}
                placeholder='Selecione a oferta desejada'
                onChange={this.handleSelectSemester}
                options={semesters}
              />
            </Fragment>
          }
          { classes &&
            <div>
              <h3>Disciplinas Cursadas</h3>
              <form className='student-form-list' onSubmit={this.handleFormSubmit}>
                <ClassesList 
                  classes={classes}
                  allClassesDone={allClassesDone}
                  handleInputChange={this.handleInputChange} />
                { messageErrors.length > 0 &&
                  <MessageError errors={messageErrors} />
                }
                <button className='student-form-button' type='submit'>Gerar grade</button>
              </form>
            </div>
          }
          { isFetching && <Loading /> }
        </div>
      </div>
    )
  }
}

export default StudentForm
