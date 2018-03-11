import React, { Component } from 'react'

import './AdminPage.css'
import CourseOfferings from './CourseOfferings'

class Admin extends Component {
  render() {
    return (
      <div className="admin-page">
        <CourseOfferings />
      </div>
    )
  }
}

export default Admin
