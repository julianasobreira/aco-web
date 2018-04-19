import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CourseOfferingItem from './CourseOfferingItem'
import EditMenu from '../EditMenu/EditMenu'

class EditCourseOffering extends Component {
  render() {
    const { courseOffering } = this.props
    return (
      <div>
        <EditMenu
          onSave={this.onSave}
          onCancel={this.onCancel} />
        <CourseOfferingItem courseOffering={courseOffering}/>
      </div>
    )
  }
}

EditCourseOffering.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  courseOffering: PropTypes.object
}

export default EditCourseOffering
