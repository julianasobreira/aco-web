import React, { Component } from 'react'
import './StudentForm.css'
import Checkbox from '../Checkbox/Checkbox'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import PropTypes from 'prop-types'

class StudentForm extends Component {
  baseURL = 'https://quiet-wave-46823.herokuapp.com/api/v1.0/'
  state = {
    course: '',
    classes: [],
    done: []
  }

  fetchClasses = () => {
    axios.get(`${this.baseURL}grade?curso=${this.state.course}`)
    .then(response => {
      this.setState({ classes: response.data })
    })
    .catch(error => {
      console.log(error)
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
    });
  }

  handleFormSubmit = e => {
    const { done, course } = this.state
    e.preventDefault()
    this.props.handleSubmit(course, done)
  }

  showDisciplines = () => {
    const { classes } = this.state
    return (
      <form className='student-form-classes' onSubmit={this.handleFormSubmit}>
       {
        classes.map(item =>
          <div key={item.codDisciplina}>
            <input
              name={item.codDisciplina}
              type='checkbox'
              value={item.codDisciplina}
              onChange={e => this.handleInputChange(e, item)} />
            <span>{`${item.codDisciplina} - ${item.nome}`}</span>
          </div>
        )
       }
       <button type='submit'>Gerar grade</button>
      </form> 
    )
  }

  render() {
    const { course, classes } = this.state
    return (
      <div>
        <h3>Curso</h3>
        <Select
          name='course'
          value={course}
          onChange={this.handleChange}
          options={[
            { value: 'Engenharia de Computação', label: 'Engenharia da Computação' }
          ]}
        />
        { classes.length > 0 &&
          <div>
            <h3>Disciplinas Cursadas</h3>
            {this.showDisciplines()}
          </div>
        }
      </div>
    )
  }
}

StudentForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default StudentForm
