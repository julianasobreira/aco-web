import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import StudentForm from '../StudentForm/StudentForm'
import Loading from '../Loading/Loading'
import ClassSchedule from '../ClassSchedule/ClassSchedule'

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
            ? <ClassSchedule
                classesGrid={classesGrid}
                showClassesGrid={this.showClassesGrid} />
            : <StudentForm 
                handleSolution={this.fetchSolutions}
                isFetching={this.props.isFetching} />
          }
        </div>
      </section>
    )
  }
}

StudentForm.propTypes = {
  isFetching: PropTypes.func
}

export default AppBody