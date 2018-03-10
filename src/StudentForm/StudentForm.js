import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import axios from 'axios'

import './StudentForm.css'
import 'react-select/dist/react-select.css'

import ClassesList from '../ClassesList/ClassesList'

class StudentForm extends Component {
  baseURL = 'https://quiet-wave-46823.herokuapp.com/api/v1.0/'
  state = {
    course: '',
    classes: null,
    done: []
  }

  fetchClasses = () => {
    const { isFetching } = this.props
    isFetching(true)

    axios.get(`${this.baseURL}grade?curso=${this.state.course}`)
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
    axios.post(`${this.baseURL}solucao?curso=${course}&semestre=2017.1`, done)
    .then(response => {
      const classesGrid = response.data
      handleSolution(classesGrid)
      isFetching(false)
    })
    .catch(error => {
      isFetching(false)
    })
  }

  handleChange = item => {
    this.setState({
      course: item.value
    }, this.fetchClasses)
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
    const { course, classes } = this.state

    return (
      <div className='student-form'>
        <h3>Curso</h3>
        <Select
          name='course'
          value={course}
          onChange={this.handleChange}
          options={[
            { value: 'Engenharia da Computação', label: 'Engenharia da Computação' }
          ]}
        />
        <ClassesList 
          classes={ classes } 
          handleFormSubmit={ this.handleFormSubmit }
        />
      </div>
    )
  }
}

StudentForm.propTypes = {
  handleSolution: PropTypes.func,
  isFetching: PropTypes.func
}

export default StudentForm
