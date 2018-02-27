import React, { Component } from 'react'
import './StudentForm.css'
import Checkbox from '../Checkbox/Checkbox'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'

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

  handleSubmit = e => {
    console.log(e.target)
    e.preventDefault();
  }

  handleInputChange = e => {
    const { value, name } = e.target
    this.setState(prevState => {
      if (value) {
        return {
          done: [...prevState.done, name]
        }
      }
      return {
        done: prevState.done.filter(item => item !== name)
      }
    });
  }

  showDisciplines = () => {
    const { classes } = this.state
    return (
      <form className='student-form-classes' onSubmit={this.handleSubmit}>
       {
        classes.map(item =>
          <div key={item.codDisciplina}>
            <input
              name={item.codDisciplina}
              type='checkbox'
              value={item.codDisciplina}
              onChange={this.handleInputChange} />
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

export default StudentForm
