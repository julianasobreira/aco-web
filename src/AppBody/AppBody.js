import React, { Component } from 'react'
import './AppBody.css'
import StudentForm from '../StudentForm/StudentForm'
import ClassScheduleGrid from '../ClassScheduleGrid/ClassScheduleGrid'
import axios from 'axios'

class AppBody extends Component {
  baseURL = 'https://quiet-wave-46823.herokuapp.com/api/v1.0/'
  state = {
    classes: [],
    isGridVisible: false,
    classesGrid: {
      seg: { '8': '', '10': '', '14': '', '16': '' },
      ter: { '8': '', '10': '', '14': '', '16': '' },
      qua: { '8': '', '10': '', '14': '', '16': '' },
      qui: { '8': '', '10': '', '14': '', '16': '' },
      sex: { '8': '', '10': '', '14': '', '16': '' }
    }
  }

  handleSubmit = (course, done) => {
    this.fetchClasses(course, done)
  }

  fetchClasses = (course, done) => {
    axios.post(`${this.baseURL}solucao?curso=${course}&semestre=2017.1`, done)
    .then(response => {
      const classes = response.data
      const { classesGrid } = this.state
      classes.forEach(classItem => {
        const { dia, horarioInicial } = classItem
        classesGrid[dia][horarioInicial] = `${classItem.codOferta} - ${classItem.disciplinaOfertada.nome}`
      })
      this.setState({ 
        isGridVisible: true,
        classesGrid
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  showClassesGrid = () => {
    this.setState({ isGridVisible: false })
  }

  render() {
    const { 
      isGridVisible, 
      classesGrid,
      classes } = this.state

    return (
      <section className='app-body'>
        <div className='app-body-container'>
          { isGridVisible
            ? <ClassScheduleGrid 
                classes={classes} 
                classesGrid={classesGrid}
                showClassesGrid={this.showClassesGrid} />
            : <StudentForm handleSubmit={this.handleSubmit} />
          }
        </div>
      </section>
    )
  }
}

export default AppBody
