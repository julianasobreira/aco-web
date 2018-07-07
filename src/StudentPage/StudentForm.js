import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import axios from 'axios'

import './StudentForm.css'
import 'react-select/dist/react-select.css'

import ClassesList from './ClassesList'
import MessageError from '../MessageError/MessageError'

class StudentForm extends Component {
  state = {
    course: '',
    courses: [
      { value: 'Engenharia da Computação', label: 'Engenharia da Computação' }
    ],
    classes: null,
    semester: '',
    semesters: null,
    done: [],
    messageErrors: [] 
  }

  fetchClasses = () => {
    const { isFetching } = this.props
    isFetching(true)

    axios.get(`${process.env.API_URL}/curso?nome=${this.state.course}`)
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
        classes: courseModules,
        semesters: semestres.map(semester => ({ value: semester, label: semester }))
      })
      isFetching(false)
    })
    .catch(error => {
      isFetching(false)
      this.setState({ fetchError: false })
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { isFetching, handleSolution } = this.props
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

    isFetching(true)
    axios.post(`${process.env.API_URL}/solucao?curso=${course}&semestre=${semester}`, done)
    .then(response => {
      const classesGrid = response.data
      handleSolution(classesGrid)
      isFetching(false)
    })
    .catch(error => {
      isFetching(false)
    })
  }

  handleSelectCourse = item => {
    this.setState({
      course: item.value
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
      messageErrors } = this.state

    return (
      <div className='student-form'>
        <h3>Curso</h3>
        <Select
          className='student-form-select'
          name='course'
          value={course}
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
      </div>
    )
  }
}

StudentForm.propTypes = {
  handleSolution: PropTypes.func,
  isFetching: PropTypes.func
}

export default StudentForm
