import React, { Component } from 'react'
import './StudentForm.css'
import Loading from '../Loading/Loading'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'
import PropTypes from 'prop-types'

class StudentForm extends Component {
  baseURL = 'https://quiet-wave-46823.herokuapp.com/api/v1.0/'
  state = {
    course: '',
    isFetching: false,
    classes: null,
    done: []
  }

  fetchClasses = () => {
    this.setState({ isFetching: true })
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
      this.setState({ 
        classes: courseModules,
        isFetching: false
      })
    })
    .catch(error => {
      this.setState({ isFetching: false })
      console.log(error)
    })
  }

  fetchSolution = () => {
    console.log('isFetching')
    const {course, done} = this.state
    axios.post(`${this.baseURL}solucao?curso=${course}&semestre=2017.1`, done)
    .then(response => {
      const classesGrid = response.data
      this.setState({ 
        isGridVisible: true,
        isFetching: false
      }, this.props.handleSolution(classesGrid))
    })
    .catch(error => {
      this.setState({ isFetching: false })
      console.log(error)
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    this.setState({ isFetching: true }, this.fetchSolution)
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

  showDisciplines = () => {
    const { classes } = this.state
    return (
      <form className='student-form-classes' onSubmit={this.handleFormSubmit}>
       {
        Object.keys(classes).map(moduleName =>
          <div key={moduleName}>
            <h4>{moduleName}</h4>
            {
              classes[moduleName].map(item =>
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
          </div>
        )
       }
       <button className='student-form-button' type='submit'>Gerar grade</button>
      </form> 
    )
  }

  render() {
    const { 
      course, 
      classes,
      isFetching } = this.state

    return (
      <div>
        <h3>Curso</h3>
        <Select
          name='course'
          value={course}
          onChange={this.handleChange}
          options={[
            { value: 'Engenharia da Computação', label: 'Engenharia da Computação' }
          ]}
        />
        { classes &&
          <div>
            <h3>Disciplinas Cursadas</h3>
            {this.showDisciplines()}
          </div>
        }
        { isFetching && <Loading /> }
      </div>
    )
  }
}

StudentForm.propTypes = {
  handleSolution: PropTypes.func
}

export default StudentForm
