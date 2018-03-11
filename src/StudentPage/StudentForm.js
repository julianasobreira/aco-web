import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import axios from 'axios'

import './StudentForm.css'
import 'react-select/dist/react-select.css'

import ClassesList from './ClassesList'

class StudentForm extends Component {
  state = {
    course: '',
    classes: null,
    semester: null,
    semesters: [],
    done: []
  }

  fetchClasses = () => {
    const { isFetching } = this.props
    isFetching(true)

    axios.get(`${process.env.API_URL}grade?curso=${this.state.course}`)
    .then(response => {
      const classes = response.data
      const courseModules = {}
      classes.forEach(classItem => {
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
      this.setState({ classes: courseModules })
      isFetching(false)
    })
    .catch(error => {
      isFetching(false)
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { isFetching, handleSolution } = this.props
    const {course, done} = this.state

    isFetching(true)
    axios.post(`${process.env.API_URL}solucao?curso=${course}&semestre=2017.1`, done)
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
    const { course, classes, semesters } = this.state

    return (
      <div className='student-form'>
        <h3>Curso</h3>
        <Select
          name='course'
          value={course}
          onChange={this.handleSelectCourse}
          options={[
            { value: 'Engenharia da Computação', label: 'Engenharia da Computação' }
          ]}
        />
        <h3>Ofertas</h3>
        <Select
          name='semester'
          value={semesters[0] || ''}
          onChange={this.handleSelectSemester}
          options={semesters}
        />
        <h3>Disciplinas Cursadas</h3>
        <form className='student-form-list' onSubmit={this.handleFormSubmit}>
          <ClassesList 
            classes={ classes }
            handleInputChange={ this.handleInputChange } />
          <button className='student-form-button' type='submit'>Gerar grade</button>
        </form>
      </div>
    )
  }
}

StudentForm.propTypes = {
  handleSolution: PropTypes.func,
  isFetching: PropTypes.func
}

export default StudentForm
