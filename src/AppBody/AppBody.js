import React, { Component } from 'react'
import './AppBody.css'
import StudentForm from '../StudentForm/StudentForm'
import Loading from '../Loading/Loading'
import ClassScheduleGrid from '../ClassScheduleGrid/ClassScheduleGrid'
import axios from 'axios'

class AppBody extends Component {
  baseURL = 'https://quiet-wave-46823.herokuapp.com/api/v1.0/'
  state = {
    classes: [],
    classesGrid: null,
    isGridVisible: false
  }

  fetchSolutions = classesGrid => {
    this.setState({ 
      isGridVisible: true,
      classesGrid
    })
  }

  showClassesGrid = () => {
    this.setState({ isGridVisible: false })
  }

  render() {
    const{ isGridVisible, classesGrid } = this.state
    return (
      <section className='app-body'>
        <div className='app-body-container'>
          { isGridVisible
            ? <ClassScheduleGrid
                classesGrid={classesGrid}
                showClassesGrid={this.showClassesGrid} />
            : <StudentForm handleSolution={this.fetchSolutions} />
          }
        </div>
      </section>
    )
  }
}

export default AppBody
